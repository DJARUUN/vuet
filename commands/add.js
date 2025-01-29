import { config } from "../index.js";
import { logFatal, logHeader, logInfo, logResult } from "../utils/logging.js";
import fs from "fs";
import { fixPath } from "../utils/misc.js";
import chalk from "chalk";

const basePath = "../components/";

/** @type {Set<string>} */
const addedComponentsSet = new Set();

/** @type {{ component: string; indentLevel: number; content: string; fullPath: string; alreadyAdded: boolean }[]} */
const addedComponents = [];

function createDirsIfNotExists() {
  const pathSegments = config.componentsDir
    .split("/")
    .filter((segment) => segment !== "");

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const prefix = pathSegments.slice(0, i).join("/");
    const fullPath = `${prefix + (prefix !== "" ? "/" : "")}${segment}`;

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  }
}

/**
 * @param {string} content
 * @param {string} fullPath
 */
function createComponent(content, fullPath) {
  // console.log("WROTE:", fullPath);
  fs.writeFileSync(fullPath, content);
}

/**
 * @param {string[]} components
 * @param {{ force: boolean }} options
 */
export async function handleAddCommand(components, { force }) {
  /**
   * @param {string} component
   * @param {number} indentLevel
   */
  async function aux(component, indentLevel = 0) {
    let alreadyAdded = false;
    const fullPath = `${fixPath(config.componentsDir)}V${component}.vue`;

    if (
      !force &&
      (addedComponentsSet.has(component) || fs.existsSync(fullPath))
    ) {
      alreadyAdded = true;
    }

    logHeader(`Adding ${component}`, indentLevel, false);

    const [componentPath, metaPath] = [
      `${basePath}V${component}.vue`,
      `${basePath}V${component}.meta.json`,
    ];

    logInfo("Getting metadata", indentLevel);

    let metaContent;
    try {
      metaContent = JSON.parse(fs.readFileSync(metaPath).toString());
    } catch (err) {
      logFatal(
        `${component} is not an existing component.\nIf you want me to add it create an issue in the GitHub repository and we'll see what I can do.`,
      );
    }

    const needs = metaContent.needs;
    if (needs.length > 0) {
      logInfo("Getting dependencies", indentLevel);
      for (const need of needs) {
        await aux(need, indentLevel + 1);
      }
    }

    let componentContent;
    if (force || !alreadyAdded) {
      logInfo("Reading source", indentLevel);

      try {
        componentContent = fs.readFileSync(componentPath);
      } catch (err) {
        logFatal("Something went wrong.\nTry again later.");
      }

      logInfo(
        `Adding ${chalk.reset.green(component)} ${chalk.reset.dim("")} ${chalk.reset.gray(fullPath)}`,
        indentLevel,
      );
    } else {
      logInfo(
        `Using existing ${chalk.reset.green(component)} ${chalk.reset.dim("")} ${chalk.reset.gray(fullPath)}`,
        indentLevel,
      );
    }

    addedComponentsSet.add(component);

    addedComponents.push({
      component,
      indentLevel,
      content: !force && alreadyAdded ? null : componentContent,
      fullPath,
      alreadyAdded,
    });
  }

  const uniqueComponents = [...new Set(components)];

  for (const component of uniqueComponents) {
    await aux(component, 0);
  }

  createDirsIfNotExists();

  if (addedComponents.length > 0) {
    logHeader("Added components");

    addedComponents
      .toReversed()
      .forEach(
        ({ component, indentLevel, content, fullPath, alreadyAdded }) => {
          if (force || !alreadyAdded) {
            createComponent(content, fullPath);
          }

          logResult(component, indentLevel + 1, alreadyAdded);
        },
      );
  }
}
