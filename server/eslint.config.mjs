import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  { files: ['src/**/*.{js,ts, tsx, jsx}', 'test/**/*.{js,ts, tsx, jsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrors: 'none', argsIgnorePattern: '^(req|res|next)$' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        { caughtErrors: 'none', argsIgnorePattern: '^(req|res|next)$' },
      ],
    },
  },
  eslintConfigPrettier,
];
