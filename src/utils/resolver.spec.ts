import { describe, expect, it } from "vitest";
import { resolveSkillSource, type SkillSource } from "./resolver";

describe("resolveSkillSource", () => {
  describe("GitHub sources", () => {
    it("resolves full HTTPS GitHub URL", () => {
      const result = resolveSkillSource("https://github.com/facebook/react");

      expect(result).toEqual<SkillSource>({
        type: "github",
        skill: "react",
        repo: {
          owner: "facebook",
          repo: "react",
        },
      });
    });

    it("resolves github.com prefix format", () => {
      const result = resolveSkillSource("github.com/microsoft/typescript");

      expect(result).toEqual<SkillSource>({
        type: "github",
        skill: "typescript",
        repo: {
          owner: "microsoft",
          repo: "typescript",
        },
      });
    });

    it("resolves owner/repo shorthand format", () => {
      const result = resolveSkillSource("vercel/next.js");

      expect(result).toEqual<SkillSource>({
        type: "github",
        skill: "next-js",
        repo: {
          owner: "vercel",
          repo: "next.js",
        },
      });
    });

    it("resolves repos with hyphens in owner and repo", () => {
      const result = resolveSkillSource("my-org/my-skill");

      expect(result).toEqual<SkillSource>({
        type: "github",
        skill: "my-skill",
        repo: {
          owner: "my-org",
          repo: "my-skill",
        },
      });
    });

    it("resolves repos with underscores", () => {
      const result = resolveSkillSource("some_org/some_repo");

      expect(result).toEqual<SkillSource>({
        type: "github",
        skill: "some-repo",
        repo: {
          owner: "some_org",
          repo: "some_repo",
        },
      });
    });

    it("resolves GitHub URL with trailing slash", () => {
      const result = resolveSkillSource("https://github.com/owner/repo/");

      expect(result).toEqual<SkillSource>({
        type: "github",
        skill: "repo",
        repo: {
          owner: "owner",
          repo: "repo",
        },
      });
    });
  });

  describe("local sources", () => {
    it("resolves simple lowercase skill name", () => {
      const result = resolveSkillSource("typescript");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "typescript",
      });
    });

    it("resolves kebab-case skill name", () => {
      const result = resolveSkillSource("my-awesome-skill");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "my-awesome-skill",
      });
    });

    it("resolves uppercase skill name", () => {
      const result = resolveSkillSource("TypeScript");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "typescript",
      });
    });

    it("resolves mixed case skill name", () => {
      const result = resolveSkillSource("MySkill");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "myskill",
      });
    });

    it("resolves numeric skill name", () => {
      const result = resolveSkillSource("skill123");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "skill123",
      });
    });

    it("resolves skill name with numbers and hyphens", () => {
      const result = resolveSkillSource("es2024-features");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "es2024-features",
      });
    });

    it("resolves single character skill name", () => {
      const result = resolveSkillSource("a");

      expect(result).toEqual<SkillSource>({
        type: "local",
        skill: "a",
      });
    });
  });

  describe("invalid inputs", () => {
    it("returns undefined for empty string", () => {
      const result = resolveSkillSource("");

      expect(result).toBeUndefined();
    });

    it("returns undefined for skill name with spaces", () => {
      const result = resolveSkillSource("my skill");

      expect(result).toBeUndefined();
    });

    it("returns undefined for skill name with special characters", () => {
      const result = resolveSkillSource("skill@name");

      expect(result).toBeUndefined();
    });

    it("returns undefined for skill name with dots (not a valid owner/repo)", () => {
      const result = resolveSkillSource("skill.name");

      expect(result).toBeUndefined();
    });

    it("returns undefined for skill name with underscores (not matching local pattern)", () => {
      const result = resolveSkillSource("skill_name");

      expect(result).toBeUndefined();
    });

    it("returns undefined for path-like strings that are not GitHub repos", () => {
      const result = resolveSkillSource("/path/to/skill");

      expect(result).toBeUndefined();
    });

    it("returns undefined for HTTP (non-HTTPS) GitHub URLs", () => {
      const result = resolveSkillSource("http://github.com/owner/repo");

      expect(result).toBeUndefined();
    });

    it("returns undefined for other git hosting services", () => {
      const result = resolveSkillSource("https://gitlab.com/owner/repo");

      expect(result).toBeUndefined();
    });

    it("returns undefined for GitHub URLs with extra path segments", () => {
      const result = resolveSkillSource(
        "https://github.com/owner/repo/tree/main",
      );

      expect(result).toBeUndefined();
    });
  });
});
