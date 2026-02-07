import { describe, expect, it } from "vitest"; // or jest
import { parseGitHubRepo } from "./github";

describe("parseGitHubRepo", () => {
  describe("valid inputs", () => {
    it("parses full HTTPS URL", () => {
      const result = parseGitHubRepo("https://github.com/facebook/react");
      expect(result).toEqual({ owner: "facebook", repo: "react" });
    });

    it("parses github.com prefix format", () => {
      const result = parseGitHubRepo("github.com/microsoft/typescript");
      expect(result).toEqual({ owner: "microsoft", repo: "typescript" });
    });

    it("parses short owner/repo format", () => {
      const result = parseGitHubRepo("vercel/next.js");
      expect(result).toEqual({ owner: "vercel", repo: "next.js" });
    });

    it("handles trailing slashes", () => {
      const result = parseGitHubRepo("https://github.com/owner/repo/");
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });

    it("handles repos with dots, hyphens, and underscores", () => {
      const result = parseGitHubRepo("some-org/my_repo.js");
      expect(result).toEqual({ owner: "some-org", repo: "my_repo.js" });
    });

    it("trims whitespace", () => {
      const result = parseGitHubRepo("  owner/repo  ");
      expect(result).toEqual({ owner: "owner", repo: "repo" });
    });
  });

  describe("invalid inputs", () => {
    it("returns undefined for empty string", () => {
      expect(parseGitHubRepo("")).toBeUndefined();
    });

    it("returns undefined for missing repo", () => {
      expect(parseGitHubRepo("owner")).toBeUndefined();
    });

    it("returns undefined for HTTP URLs (only HTTPS supported)", () => {
      expect(parseGitHubRepo("http://github.com/owner/repo")).toBeUndefined();
    });

    it("returns undefined for other git hosts", () => {
      expect(parseGitHubRepo("https://gitlab.com/owner/repo")).toBeUndefined();
    });

    it("returns undefined for URLs with extra path segments", () => {
      expect(
        parseGitHubRepo("https://github.com/owner/repo/tree/main"),
      ).toBeUndefined();
    });
  });
});
