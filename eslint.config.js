// @ts-nocheck
// noinspection JSCheckFunctionSignatures

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
// @ts-ignore
import jestPlugin from 'eslint-plugin-jest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  { ignores: ['**/.next/*', '**/storybook-static/*', '**/.turbo/*', '**/.vercel/*', '**/dist/*', 'next.config.js'] },
  eslint.configs.recommended,
  ...compat.extends('eslint-config-turbo'),
  eslintPluginPrettierRecommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // base config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: true,
        tsconfigRootDir: import.meta.dirname
      },
      sourceType: 'script'
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'no-console': 'error',
      'turbo/no-undeclared-env-vars': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'clsx/clsx',
              message: 'Not gonna work. Import directly from clsx instead'
            },
            {
              name: 'process',
              message: 'Do not import from process'
            }
          ],
          patterns: [
            {
              group: [
                '@echo/**/src/*',
                '@echo/**/test/mocks/*',
                '@echo/**/test-utils/*',
                'lib/*',
                'src/*',
                './*',
                '../*'
              ],
              message: 'Use path mapping instead'
            },
            {
              group: ['firebase-admin/lib/*'],
              message: 'Nothing is exported from firebase-admin/lib/. Please use firebase-admin/[package] instead'
            },
            {
              group: ['firebase-functions/lib/*'],
              message:
                'Nothing is exported from firebase-functions/lib/. Please use firebase-functions/[package] instead'
            }
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.{js,mjs}'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    files: ['**/babel.config.js', '**/jest.config.js', '**/postcss.config.js'],
    rules: {
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*test.ts', '**/test/@utils/**/*.ts'],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules
    }
  },
  {
    files: ['**/*test.ts', '**/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  }
)
