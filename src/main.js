import fs from "fs";
import chalk from "chalk";
const getFlowsFromFile = (file) => {
  const contents = fs.readFileSync(file);
  const jsonContent = JSON.parse(contents);
  return jsonContent;
};

export async function searchFlow({ property, string, file, hostname }) {
  console.log(
    `All the flows in file: ${chalk.white.bold(
      file
    )} That have a property ${chalk.white.bold(
      property
    )} that contains: ${chalk.white.bold(string)}`
  );
  console.log();
  const flows = getFlowsFromFile(file);
  for (let i = 0; i < flows.flows.length; i += 1) {
    if (flows.flows[i].nodes) {
      for (let b = 0; b < flows.flows[i].nodes.length; b += 1) {
        for (let c = 0; c < flows.flows[i].nodes[b].actions.length; c += 1) {
          let node = flows.flows[i].nodes[b].actions[c];
          let item = node[property];
          if (item && item.includes(string)) {
            console.log(
              `${chalk.white.bold(flows.flows[i].name)}  - https:/${hostname}/flow/editor_next/${flows.flows[i].uuid}`
            );
          }
        }
      }
    }
  }
}
