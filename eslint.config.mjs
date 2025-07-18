import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,  
      },
      env: {
        browser: true,
        node: true,       
        es2021: true,
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
  },
]);
