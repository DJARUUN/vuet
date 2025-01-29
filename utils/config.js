import path from "path";
import { logFatal } from "./logging.js";
import defaultConfig from "../vuet.config.js";
import { pathToFileURL } from "url";

/** @returns {Promise<import('../types').Config>} */
export async function loadConfig() {
  try {
    const configPath = path.resolve(process.cwd(), "vuet.config.js");
    const config = await import(pathToFileURL(configPath));
    return config.default;
  } catch (error) {
    if (error.code === "ERR_MODULE_NOT_FOUND") {
      return defaultConfig;
    }

    logFatal(
      `Failed to load vuet.config.js from project root: ${error.message}`,
    );
  }
}
