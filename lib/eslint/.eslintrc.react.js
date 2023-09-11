module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    '../../.eslintrc.js'
  ],
  rules: {
    'import/default': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@echo/alchemy/src/*', '@echo/alchemy/exports/*', '@echo-alchemy/*'],
            message: 'Please use @echo/alchemy/ instead.'
          },
          {
            group: ['@echo/api/src/*', '@echo/api/exports/*', '@echo-api/*'],
            message: 'Please use @echo/api/ instead.'
          }
        ]
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
