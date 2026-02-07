import { type GitHubRepo, parseGitHubRepo } from "./github";

export type SkillSource =
  | {
      type: "local";
      skill: string;
    }
  | {
      type: "github";
      skill: string;
      repo: GitHubRepo;
    };

export function resolveSkillSource(skill: string): SkillSource | undefined {
  // Check if it looks like a GitHub URL or shorthand
  const githubRepo = parseGitHubRepo(skill);

  if (githubRepo) {
    return {
      type: "github",
      skill: sanitizeRepoName(githubRepo.repo),
      repo: githubRepo,
    };
  }

  // Valid local skill names should be kebab-case or alphanumeric
  if (/^[a-z0-9-]+$/i.test(skill)) {
    return {
      type: "local",
      skill: skill.toLocaleLowerCase(),
    };
  }

  return;
}

/**
 * Sanitizes a skill name to be folder-friendly.
 *
 * Transforms the input to only contain lowercase letters, numbers, and hyphens.
 *
 * Rules applied:
 * - Converts to lowercase
 * - Replaces underscores, dots, and spaces with hyphens
 * - Removes all other special characters
 * - Collapses multiple consecutive hyphens into one
 * - Trims leading and trailing hyphens
 *
 * @param repoName - The skill name to sanitize
 * @returns A folder-friendly name matching pattern [a-z0-9-]
 */
function sanitizeRepoName(repoName: string): string {
  return repoName
    .toLowerCase()
    .replace(/[_.\s]+/g, "-") // Replace underscores, dots, spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove any remaining invalid characters
    .replace(/-+/g, "-") // Collapse multiple hyphens into one
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
}
