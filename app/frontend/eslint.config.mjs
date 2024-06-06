// @ts-check

import baseConfig from '../../eslint.config.mjs'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactRecommended from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import { fixupPluginRules } from '@eslint/compat'
import eslintPluginNext from '@next/eslint-plugin-next'

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
      '@next/next': fixupPluginRules(eslintPluginNext)
    },
    rules: {
      ...eslintPluginNext.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
