module.exports = {
  extends: ['plugin:@next/next/recommended', '../../.eslintrc.js'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: ['@echo/firebase-admin']
      }
    ]
  }
}
