// @ts-check

import baseConfig from '../../eslint.config.mjs'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactRecommended from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
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
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      react: eslintPluginReact
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
