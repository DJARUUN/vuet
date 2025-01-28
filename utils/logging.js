import { config } from "../index.js";
import { fixPath } from "./misc.js";

export function logFatal(message) {
  console.log("\n> Execution stopped due to an error:");
  console.error(message);
  process.exit(1);
}

export function logInfo(message, indentLevel = 0) {
  console.log(`${"  ".repeat(indentLevel + 1)}- ${message}`);
}

export function logHeader(message, indentLevel = 0) {
  console.log(`${"  ".repeat(indentLevel)}# ${message}:`);
}

export function logResult(component, indentLevel) {
  console.log(
    `${"  ".repeat(indentLevel)}+ ${component} -> ${fixPath(config.componentsDir)}V${component}.vue`,
  );
}
