import { readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function listSkills(): Promise<void> {
  const skillsDir = resolve(__dirname, "skills");

  try {
    const skills = await readdir(skillsDir);

    if (skills.length === 0) {
      console.log(pc.yellow("\nNo skills found."));
      return;
    }

    console.log(pc.bold("\nAvailable skills:"));
    for (const skill of skills) {
      const skillPath = join(skillsDir, skill);
      const skillStat = await stat(skillPath);

      if (skillStat.isDirectory()) {
        console.log(`  ${pc.cyan("•")} ${skill}`);
      }
    }
    console.log("");
  } catch (error) {
    console.log(
      `${pc.red("✗")} Failed to list skills: ${error instanceof Error ? error.message : error}`,
    );
    process.exit(1);
  }
}
