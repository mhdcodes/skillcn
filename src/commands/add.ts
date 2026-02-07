import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { confirm, isCancel } from "@clack/prompts";
import { blue, bold, cyan, green, red, yellow } from "picocolors";

import { resolveSkillSource } from "../utils/resolver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function installLocalSkill(
  skillName: string,
  options: { dryRun?: boolean },
): Promise<boolean> {
  const sourceDir = resolve(__dirname, "skills", skillName);
  const targetDir = resolve(process.cwd(), ".agents/skills", skillName);

  try {
    // Check if skill exists in source
    try {
      await stat(sourceDir);
    } catch {
      console.log(`${red("✗")} Skill "${skillName}" not found`);
      return false;
    }

    if (options.dryRun) {
      console.log(`${blue("→")} Would install ${cyan(skillName)}`);
      return true;
    }

    // Check if target directory exists
    let targetExists = false;
    try {
      await stat(targetDir);
      targetExists = true;
    } catch {
      // Target doesn't exist, which is fine
    }

    // If target exists and force is not set, prompt user
    if (targetExists) {
      const shouldOverwrite = await confirm({
        message: `Skill "${cyan(skillName)}" already exists. Overwrite?`,
        initialValue: false,
      });

      // User cancelled or said no
      if (isCancel(shouldOverwrite) || !shouldOverwrite) {
        console.log(`${yellow("⊘")} Skipped ${cyan(skillName)}`);
        return false;
      }
    }

    // Create target directory
    await mkdir(targetDir, { recursive: true });

    // Copy all files from source to target
    const files = await readdir(sourceDir);
    let copiedFiles = 0;

    for (const file of files) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);

      const fileStat = await stat(sourcePath);

      if (fileStat.isFile()) {
        await copyFile(sourcePath, targetPath);
        copiedFiles++;
      }
    }

    if (copiedFiles > 0) {
      console.log(`${green("✓")} Installed ${cyan(skillName)}`);
      return true;
    } else {
      console.log(`${yellow("⚠")} No files copied for ${cyan(skillName)}`);
      return false;
    }
  } catch (error) {
    console.log(
      `${red("✗")} Failed to install "${skillName}": ${error instanceof Error ? error.message : error}`,
    );
    return false;
  }
}

async function installSkill(
  skillName: string,
  options: { dryRun?: boolean },
): Promise<boolean> {
  const source = resolveSkillSource(skillName);
  if (!source) {
    console.log(`${red("✗")} Invalid skill name or URL: "${skillName}"`);
    return false;
  }

  if (source.type === "local") {
    return installLocalSkill(source.skill, {
      dryRun: options.dryRun,
    });
  }

  return false;
}

export async function addSkills(
  skills: string[],
  options: { dryRun: boolean },
) {
  console.log(bold(`\nInstalling ${skills.length} skill(s)...\n`));

  let successCount = 0;

  for (const skill of skills) {
    const success = await installSkill(skill, {
      dryRun: options.dryRun,
    });
    if (success) successCount++;
  }

  console.log(
    `\n${blue(`${successCount}/${skills.length}`)} skill(s) ${options.dryRun ? "would be " : ""}installed`,
  );

  if (successCount < skills.length) {
    process.exit(1);
  }
}
