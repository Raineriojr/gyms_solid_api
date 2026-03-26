import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

const importPlugin = pluginImport;
const unusedImportsPlugin = unusedImports;

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      // 🔥 estilo
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],

      // 🔥 boas práticas
      "no-console": ["warn", "error", { allow: ["error"] }],
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // 🔥 espaçamento
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],

      // 🔥 IMPORTANTE (evitar conflito)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // 🔥 unused imports (melhor plugin)
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // 🔥 organização de imports
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          js: "never",
        },
      ],
    },
  },
]);
