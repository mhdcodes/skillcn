import { cpSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
  dts: true,
  minify: true,
  sourcemap: true,
  platform: "node",
  target: "node18",
  // Prevent shims that cause the require issue
  shims: false,
  treeshake: true,
  inlineOnly: [
    "commander",
    "picocolors",
    "@clack/core",
    "@clack/prompts",
    "sisteransi",
  ],
  banner: {
    js: "#!/usr/bin/env node",
  },
  outExtensions: () => ({
    js: ".js",
    dts: ".d.ts",
  }),
  onSuccess: async () => {
    cpSync(join("src", "skills"), join("dist", "skills"), { recursive: true });
    console.log("✓ Copied skills directory to dist/");
  },
});
