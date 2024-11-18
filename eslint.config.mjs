import baseConfig from "@fade/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off"
    },
    ignores: ["**node_modules**"]
  },
  ...baseConfig
];
