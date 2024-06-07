// @ts-check

import baseConfig from '../../eslint.config.js'

export default [
  ...baseConfig,
  {
    rules: {
      'no-console': 'off'
    }
  }
]
