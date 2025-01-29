import { Argument, Command, Option } from "commander";
import { handleAddCommand } from "./commands/add.js";
import { loadConfig } from "./utils/config.js";

export const config = await loadConfig();

const addCommand = new Command("add")
  .description("Add a component into your project")
  .addArgument(
    new Argument(
      "components...",
      "the components to add separated by spaces",
    ).argRequired(),
  )
  .addOption(new Option("--force", "never reuse existing components"))
  .action(handleAddCommand);

const vuetCommand = new Command("vuet")
  .description(
    "A simple CLI to add Vuet components directly into your project the shadcn way.",
  )
  .version("0.0.1")
  .addCommand(addCommand);

export default function run() {
  vuetCommand.parse();
}
