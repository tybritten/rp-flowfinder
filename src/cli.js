import arg from "arg";
import inquirer from "inquirer";
import { searchFlow } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--property": String,
      "--string": String,
      "--hostname": String,
      "-p": "--property",
      "-s": "--string",
      "-h": "--hostname",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    property: args["--property"] || null,
    string: args["--string"] || null,
    hostname: args["--hostname"] || "localhost",
    file: args._[0],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.file) {
    questions.push({
      type: "input",
      name: "file",
      message: "What is the Path to the file",
    });
  }

  if (!options.property) {
    questions.push({
      type: "input",
      name: "property",
      message: "What is the property you want to search",
    });
  }
  if (!options.string) {
    questions.push({
      type: "input",
      name: "string",
      message: "What string should the property contain",
    });
  }
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    property: options.property || answers.property,
    string: options.string || answers.string,
    file: options.file || answers.file,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  console.log(options)
  searchFlow(options);
}
