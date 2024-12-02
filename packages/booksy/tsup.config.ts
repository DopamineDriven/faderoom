import { defineConfig, Options } from "tsup";

const tsupConfig = (options: Options) =>
  ({
    entry: [
      "src/index.ts",
      "src/bin/init.ts",
      "src/**/*.ts",
      "!src/generated/**/*",
      "!src/utils/**/*",
      "!public/**/*",
      "!src/services/test.ts"
    ],
    target: ["esnext"],
    dts: true,
    watch: process.env.NODE_ENV === "development",
    keepNames: true,
    format: ["cjs", "esm"],
    shims: true,
    sourcemap: true,
    cjsInterop: true,
    tsconfig: "tsconfig.json",
    clean: true,
    outDir: "dist",
    // onSuccess: process.env.NODE_ENV === "development" ? "node dist/index.js" : undefined,
    ...options
  }) satisfies Options;

export default defineConfig(tsupConfig);
