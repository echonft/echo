module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
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
        paths: [
          {
            name: 'clsx/clsx',
            message: 'Not gonna work. Use clsx instead'
          }
        ],
        patterns: [
          {
            group: [
              '@echo/alchemy/src/*',
              '@echo/api/src/*',
              '@echo/discord/src/*',
              '@echo/firestore/src/*',
              '@echo/model/src/*',
              '@echo/ui/src/*',
              '@echo/utils/src/*',
              '@echo/web3/src/*',
              'lib/*',
              'src/*',
              './*',
              '../*'
            ],
            message: 'Use path mapping instead'
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
