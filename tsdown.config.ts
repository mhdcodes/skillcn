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
  outExtensions: () => ({
    js: ".js",
    dts: ".d.ts",
  }),
  banner: {
    js: "#!/usr/bin/env node",
  },
});
