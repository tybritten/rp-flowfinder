import arg from "arg";
import inquirer from "inquirer";
import { searchFlow } from "./main.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf8"));

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--property": String,
      "--string": String,
      "--hostname": String,
      "--version": Boolean,
      "-p": "--property",
      "-s": "--string",
      "-h": "--hostname",
      "-v": "--version",
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
    version: args["--version"] || false,
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

async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  
  if (options.version) {
    console.log(`rp-flowfinder v${packageJson.version}`);
    return;
  }
  
  options = await promptForMissingOptions(options);
  searchFlow(options);
}

export default cli;
