module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'turbo', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: []
      }
    ],
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-undef': 'off',
    'no-console': 'warn',
    'import/no-unresolved': 'off',
    'turbo/no-undeclared-env-vars': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
}
