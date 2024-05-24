module.exports = {
  extends: ['../../.eslintrc.js'],
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
