// noinspection JSCheckFunctionSignatures

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
import jestPlugin from 'eslint-plugin-jest'
import globals from 'globals'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactRecommended from 'eslint-plugin-react/configs/recommended.js'
import { fixupPluginRules } from '@eslint/compat'
import eslintConfigGoogle from 'eslint-config-google'
import eslintPluginNext from '@next/eslint-plugin-next'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginStorybook from 'eslint-plugin-storybook'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  {
    name: 'globally ignored directories',
    ignores: ['**/.next/*', '**/storybook-static/*', '**/.turbo/*', '**/.vercel/*', '**/dist/*']
  },
  {
    name: 'base language options',
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021
      },
      sourceType: 'script'
    }
  },
  eslint.configs.recommended,
  ...compat.extends('eslint-config-turbo'),
  eslintPluginPrettierRecommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: 'base TypeScript files configuration',
    files: ['app/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}', 'env.d.ts'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
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
    name: 'disable type checking on JS files',
    files: ['app/**/*.js', 'lib/**/*.js', 'eslint.config.js'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    name: 'test files configuration',
    files: ['app/**/*test.ts', 'lib/**/*test.ts'],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules
    }
  },
  {
    name: 'test files configuration #2 - to remove',
    files: ['**/*test.ts', '**/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    name: '@echo/ui configuration',
    files: ['lib/ui/**/*.{ts,tsx}'],
    ...eslintPluginReactRecommended,
    languageOptions: {
      ...eslintPluginReactRecommended.languageOptions,
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      react: eslintPluginReact
    },
    rules: {
      ...eslintPluginReactRecommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    name: '@echo/storybook configuration',
    files: ['app/storybook/**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)', 'app/storybook/**/*.story.@(ts|tsx|js|jsx|mjs|cjs)'],
    ...eslintPluginReactRecommended,
    languageOptions: {
      ...eslintPluginReactRecommended.languageOptions,
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      react: eslintPluginReact,
      storybook: fixupPluginRules(eslintPluginStorybook)
    },
    rules: {
      ...eslintPluginReactRecommended.rules,
      ...eslintPluginStorybook.configs.recommended.overrides[0].rules,
      'react/react-in-jsx-scope': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@echo/api/fetchers/*',
                '@echo/api/providers/*',
                '@echo/web3/helpers/wagmi/fetchers/*',
                '@echo/web3/helpers/wagmi/providers/*'
              ],
              message: 'Use mocks instead'
            }
          ]
        }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    name: 'disable console on @echo/commands, @echo/contract-listener, @echo/web3',
    files: ['app/commands/**/*.{ts,tsx}', 'app/contract-listener/**/*.{ts,tsx}', 'lib/web3/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    name: '@echo/firestore-functions configuration',
    files: ['app/firestore-functions/**/*.{ts,tsx}'],
    ...eslintConfigGoogle,
    languageOptions: {
      ecmaVersion: 6
    },
    rules: {
      'require-jsdoc': 'off'
    }
  },
  {
    name: '@echo/frontend configuration',
    files: ['app/frontend/**/*.{ts,tsx}'],
    languageOptions: {
      ...eslintPluginReactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    plugins: {
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      react: eslintPluginReact,
      '@next/next': fixupPluginRules(eslintPluginNext)
    },
    rules: {
      ...eslintPluginReactRecommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    name: '@echo/firestore configuration',
    files: ['lib/firestore/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@echo/firestore/types/document-change-type',
              message: 'Re-exported type'
            },
            {
              name: '@echo/firestore/types/query-document-snapshot',
              message: 'Re-exported type'
            }
          ]
        }
      ]
    }
  }
)
