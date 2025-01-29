import { config } from "../index.js";
import { fixPath } from "./misc.js";
import chalk from "chalk";

const log = console.log;

const indentChars = "  ";

export const colors = {
  accent: chalk.green,
  half: chalk.gray,
  subtle: chalk.dim,
  error: chalk.red,
};

/**
 * @param {string} message
 */
export function logFatal(message) {
  log(colors.error.bold("\n " + "Error: ") + colors.error(message));
  process.exit(1);
}
/**
 * @param {string} message
 * @param {number} indentLevel
 */
export function logInfo(message, indentLevel = 0) {
  const indent = indentChars.repeat(indentLevel + 1);
  log(indent + colors.subtle("- " + message));
}

/**
 * @param {string} message
 * @param {number} indentLevel
 * @param {boolean} spaceAbove
 */
export function logHeader(message, indentLevel = 0, spaceAbove = true) {
  const indent = indentChars.repeat(indentLevel);
  log((spaceAbove ? "\n" : "") + indent + colors.accent.bold(" " + message));
}

/**
 * @param {string} component
 * @param {number} indentLevel
 * @param {boolean} reused
 */
export function logResult(component, indentLevel = 0, reused = false) {
  const indent = indentChars.repeat(indentLevel);
  const path = `${fixPath(config.componentsDir)}V${component}.vue`;
  log(
    indent +
      colors.accent("󰄬 " + component) +
      colors.subtle((reused ? " (reused)" : "") + "  ") +
      colors.half(path),
  );
}
