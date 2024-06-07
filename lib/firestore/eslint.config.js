// @ts-check

import baseConfig from '../../eslint.config.js'

export default [
  ...baseConfig,
  {
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
]
