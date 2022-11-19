module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js', '.eslintrc.cjs', 'lint-staged.config.js', 'prettier.config.js'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'turbo',
    'prettier'
  ],
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
    'no-console': 'warn',
    'import/no-unresolved': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
}
