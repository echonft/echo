// @ts-check

import baseConfig from '../../eslint.config.js'
import eslintPluginStorybook from 'eslint-plugin-storybook'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactRecommended from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import { fixupPluginRules } from '@eslint/compat'

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    ...eslintPluginReactRecommended,
    languageOptions: {
      ...eslintPluginReactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    plugins: {
      react: eslintPluginReact,
      storybook: fixupPluginRules(eslintPluginStorybook)
    },
    rules: {
      ...eslintPluginStorybook.configs.recommended.rules,
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
  }
]
