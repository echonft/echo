module.exports = {
  extends: ['plugin:react-hooks/recommended', 'plugin:@next/next/recommended', '../../.eslintrc.js'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: ['@echo/firebase-admin']
      }
    ]
  }
}
