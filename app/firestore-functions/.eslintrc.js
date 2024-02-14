module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['google', '../../.eslintrc.js'],
  rules: {
    'require-jsdoc': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['firebase-functions/lib/*'],
            message: 'Nothing is exported from firebase-functions/lib/. Please use firebase-functions/[package] instead'
          },
          {
            group: ['firebase-admin/lib/*'],
            message: 'Nothing is exported from firebase-admin/lib/. Please use firebase-admin/[package] instead'
          }
        ]
      }
    ]
  }
}
