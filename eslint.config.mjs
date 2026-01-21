import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import js from '@eslint/js';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['./src/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        $: true,
        alert: true,
        jquery: true,
        Node: true,
        process: true,
        Shopify: true,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'arrow-body-style': 'off',
      'no-console': 'off',
      'no-nullish-coalescing-operators': 'off',
      'no-plusplus': 'off',
      'prefer-arrow-callback': 'off',
      'prefer-optional-chain': 'off',
      'no-unused-vars': 'error',
      'no-var': 'error',
    },
  },
]);
