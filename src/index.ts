import { Command } from "commander";
import { green, red } from "picocolors";

import { addSkills, listSkills } from "./commands";

function printBanner() {
  console.log(
    green(`
            ░██    ░██░██░██                       
            ░██       ░██░██                       
  ░███████  ░██    ░██░██░██ ░██  ░███████  ░████████  
 ░██        ░██   ░██ ░██░██ ░██ ░██    ░██ ░██    ░██ 
  ░███████  ░███████  ░██░██ ░██ ░██        ░██    ░██ 
        ░██ ░██   ░██ ░██░██ ░██ ░██    ░██ ░██    ░██ 
  ░███████  ░██    ░██░██░██ ░██  ░███████  ░██    ░██ 
  `),
  );
}

async function main() {
  const program = new Command();

  program
    .name("skillcn")
    .description("CLI tool for managing agent skills")
    .version("1.0.0")
    .hook("preAction", () => {
      printBanner();
    });

  program
    .command("add")
    .description("Install one or more skills")
    .argument("<skills...>", "skills to install")
    .option("-d, --dry-run", "preview changes without copying files", false)
    .action(addSkills);

  program
    .command("list")
    .alias("ls")
    .description("List available skills")
    .action(listSkills);

  // Show help if no command provided
  if (process.argv.length === 2) {
    printBanner();
    program.help();
  }

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  console.error(red("Fatal error:"), error);
  process.exit(1);
});
