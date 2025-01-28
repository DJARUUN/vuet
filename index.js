import { Argument } from "commander";
import { Command } from "commander";

function handleAddCommand(component) {
  console.log(component);
}

const addCommand = new Command("add")
  .description("Add a component into your project")
  .addArgument(
    new Argument("component", "the name of the component to add").argRequired(),
  )
  .action(handleAddCommand);

const vuetCommand = new Command("vuet")
  .description(
    "A simple CLI to add Vuet components directly into your project the shadcn way.",
  )
  .version("0.0.1")
  .addCommand(addCommand);

vuetCommand.parse();
