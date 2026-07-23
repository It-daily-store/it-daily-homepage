import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      '.config/*',
      'node_modules',
      '.next',
      '.cache',
      'package-lock.json',
      'public',
      'next-env.d.ts',
      'next.config.ts',
      'yarn.lock',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'warn',
      'no-console': 'off',
      'react/prop-types': 'off',
      'no-case-declarations': 'off',
      'react/no-unknown-property': 'off',
      // eqeqeq: ['error', 'always'],
      // curly: 'error',
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      // '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/no-unused-vars': [
      //     'warn',
      //     { argsIgnorePattern: '^_' },
      // ],
      'react/no-children-prop': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      eqeqeq: 'warn',
      curly: 'off',
    },
  },
];
