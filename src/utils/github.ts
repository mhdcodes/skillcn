export interface GitHubRepo {
  owner: string;
  repo: string;
}

/**
 * Parses a GitHub repository reference into a structured object.
 *
 * Supported formats:
 * - https://github.com/{owner}/{repo}
 * - github.com/{owner}/{repo}
 * - {owner}/{repo}
 *
 * @param input - The GitHub repository reference string
 * @returns A GitHubRepo object with owner and repo properties or undefined
 */
export function parseGitHubRepo(input: string): GitHubRepo | undefined {
  if (!input || typeof input !== "string") {
    return;
  }

  // Define the regex pattern to match all supported formats
  const pattern =
    /^(?:https:\/\/)?(?:github\.com\/)?([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)\/?$/;

  const match = input.trim().match(pattern);

  if (!match) {
    return;
  }

  const [, owner, repo] = match;

  // Additional validation
  if (!owner || !repo) {
    return;
  }

  return {
    owner,
    repo,
  };
}

/**
 * Fetches the SKILL.md file from a GitHub repository.
 *
 * @param githubRepo - The GitHub repository reference
 * @returns The content of SKILL.md, or undefined if not found
 */
export async function fetchSkillFromGitHub(
  githubRepo: GitHubRepo,
): Promise<string | undefined> {
  const { owner, repo } = githubRepo;

  // Use raw.githubusercontent.com for direct file access
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/SKILL.md`;

  try {
    const response = await fetch(url);

    if (!response.ok || response.status === 404) {
      return;
    }

    return await response.text();
  } catch (_e) {
    return;
  }
}
