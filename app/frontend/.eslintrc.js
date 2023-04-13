module.exports = {
  extends: ['plugin:react-hooks/recommended', 'plugin:@next/next/recommended', '../../.eslintrc.js'],
  rules: {
    'import/default': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: ['@echo/firebase-admin']
      }
    ]
  }
}
