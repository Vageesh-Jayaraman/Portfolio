import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: ["node_modules/", ".next/", "out/", "build/"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: "readonly",
        console: "readonly",
        fetch: "readonly",
        Response: "readonly",
        Request: "readonly",
        Buffer: "readonly",
        atob: "readonly",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-unused-vars": "off",
      "@next/next/no-img-element": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: "readonly",
        console: "readonly",
        fetch: "readonly",
        Response: "readonly",
        Request: "readonly",
        Buffer: "readonly",
        atob: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];
