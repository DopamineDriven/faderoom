import baseConfig from "@fade/eslint-config/base";
import nextjsConfig from "@fade/eslint-config/next";
import reactConfig from "@fade/eslint-config/react";

/** @type {import('typescript-eslint').Config} */

export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  {
    ignores: [".next/**", "!.next/types/**/*", "public/**/*.js"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/require-await": "off",
      "import/consistent-type-specifier-style": "off",
      "@typescript-eslint/no-floating-promises": "off"
    }
  }
];
