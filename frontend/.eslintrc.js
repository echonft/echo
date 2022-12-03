module.exports = {
  extends: ['../.eslintrc.js', 'plugin:@next/next/recommended'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: ['@echo/firebase-admin']
      }
    ]
  }
}
