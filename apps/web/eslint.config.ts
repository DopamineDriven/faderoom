import type { Config } from "typescript-eslint";
import baseConfig from "@fade/eslint-config/base";
import nextjsConfig from "@fade/eslint-config/next";
import reactConfig from "@fade/eslint-config/react";

export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  {
    ignores: [".next/**", "!.next/types/**/*", "public/**/*.js"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/require-await": "off",
      "import/consistent-type-specifier-style": "off"
    }
  }
] satisfies Config;
