import { config } from "../index.js";
import { logFatal, logHeader, logInfo, logResult } from "../utils/logging.js";
import fs from "fs";
import { fixPath } from "../utils/misc.js";

const baseUrl =
  "https://api.github.com/repos/DJARUUN/vuet/contents/components/";
const fetchOpts = { Accept: "application/vnd.github+json" };

const addedComponents = [];

function getComponentFilenameAndMetaUrls(name) {
  return {
    componentUrl: `${baseUrl}V${name}.vue`,
    metaUrl: `${baseUrl}V${name}.meta.json`,
  };
}

function decodeContent(content) {
  const buf = Buffer.from(content, "base64");
  const decoded = buf.toString("utf8");
  return decoded;
}

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

function createComponent(content, fullPath) {
  fs.writeFileSync(fullPath, content);
}

export async function handleAddCommand(component) {
  async function aux(component, indentLevel = 0) {
    const fullPath = `${fixPath(config.componentsDir)}V${component}.vue`;

    logHeader(`Adding ${component}`, indentLevel);

    if (fs.existsSync(fullPath)) {
      logInfo(`Using existing Button -> ${fullPath}`, indentLevel);
      return;
    }

    const { componentUrl, metaUrl } =
      getComponentFilenameAndMetaUrls(component);

    logInfo("Getting metadata", indentLevel);

    const metaResult = await fetch(metaUrl, fetchOpts);
    if (!metaResult.ok) {
      logFatal(
        `${component} is not an existing component.\nIf you want me to add it create an issue in the GitHub repository and we'll see what I can do.`,
      );
    }

    const metaJson = await metaResult.json();
    const metaContent = JSON.parse(decodeContent(metaJson.content));

    const needs = metaContent.needs;
    if (needs.length > 0) {
      logInfo("Getting dependencies");
      for (const need of needs) {
        await aux(need, indentLevel + 1);
      }
    }

    logInfo("Downloading source", indentLevel);

    const componentResult = await fetch(componentUrl, fetchOpts);
    if (!componentResult.ok) {
      logFatal("Something went wrong.\nTry again later.");
    }

    const componentJson = await componentResult.json();
    const componentContent = decodeContent(componentJson.content);

    logInfo(`Adding as V${component}.vue`);

    createDirsIfNotExists();

    createComponent(componentContent, fullPath);

    addedComponents.unshift({ component: "Button", indentLevel: indentLevel });
  }

  await aux(component, 0);

  if (addedComponents.length > 0) {
    console.log();
    logHeader("Added components");

    addedComponents.forEach(({ component, indentLevel }) =>
      logResult(component, indentLevel + 1),
    );
  }
}
