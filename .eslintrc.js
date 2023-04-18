module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'turbo',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./app/*/tsconfig.json', './lib/*/tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
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
    '@typescript-eslint/no-explicit-any': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': 'error',
    'no-case-declarations': 'off',
    'import/no-unresolved': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
}
