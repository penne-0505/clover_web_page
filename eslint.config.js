import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

const baseLanguageOptions = {
  ecmaVersion: 2023,
  sourceType: "module",
};

export default [
  {
    ignores: ["dist/**", "node_modules/**", "public/**", "coverage/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["functions/**/*.{js,jsx}"],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.worker,
        ...globals.browser,
      },
    },
  },
  {
    files: ["vite.config.js", "tailwind.config.js", "postcss.config.js"],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
];
