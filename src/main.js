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
        if (flows.flows[i].nodes[b].actions) {
          for (let c = 0; c < flows.flows[i].nodes[b].actions.length; c += 1) {
            let node = flows.flows[i].nodes[b].actions[c];
            let item = "";
            if (property.includes(".") && (property.split(".")[0] in node)){
              let subitems = property.split(".")[0];
              let subprop = property.split(".")[1];
              item = node[subitems][subprop];
            } else {
              item = node[property];
            }
            if (item) {
              if (typeof item === 'string' && item.includes(string)) {
                console.log(
                  `${chalk.white.bold(
                    flows.flows[i].name
                  )}  - https:/${hostname}/flow/editor/${
                    flows.flows[i].uuid
                  }`
                );
              } else if (typeof item !== 'string') {
                console.log(
                  `${chalk.yellow('Non-string item found:')} ${chalk.cyan(typeof item)} in flow ${chalk.white.bold(flows.flows[i].name)}`
                );
                if (typeof item === 'object' && item !== null) {
                  const keys = Object.keys(item);
                  console.log(`${chalk.gray('Object keys:')} ${chalk.cyan(keys.join(', '))}`);
                } else {
                  console.log(`${chalk.gray('Value:')}`, item);
                }
              }
            }
          }
        }
      }
    }
  }
}
