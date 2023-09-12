module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@echo/utils/src/*', '@echo/utils/exports/*', '@echo-utils/*'],
            message: 'Please use @echo/utils/ instead.'
          }
        ]
      }
    ]
  }
}
