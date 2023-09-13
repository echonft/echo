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
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
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
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'error',
    'no-case-declarations': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: []
      }
    ],
    'turbo/no-undeclared-env-vars': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '@echo/alchemy/src/*',
              '@echo/api/src/*',
              '@echo/discord/src/*',
              '@echo/firestore/src/*',
              '@echo/ui/src/*',
              '@echo/utils/src/*'
            ],
            message: 'Do not import directly from src/ directory'
          }
        ]
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
}
