module.exports = {
  extends: ['../.eslintrc.js', 'plugin:@next/next/recommended'],
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/restrict-template-expressions': ['warn', { allowAny: true }],
    'no-restricted-imports': [
      'error',
      {
        paths: ['@echo/firebase-admin']
      }
    ]
  }
}
