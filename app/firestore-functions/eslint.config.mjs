// @ts-check

import globals from 'globals'
import baseConfig from '../../eslint.config.mjs'
import eslintConfigGoogle from 'eslint-config-google'

export default [
  ...baseConfig,
  {
    ...eslintConfigGoogle,
    languageOptions: {
      ecmaVersion: 6,
      globals: {
        ...globals.node
      }
    },
    rules: {
      'require-jsdoc': 'off'
    }
  }
]
