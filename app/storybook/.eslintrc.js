module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:storybook/recommended'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '@echo/api/fetchers/*',
              '@echo/api/providers/*',
              '@echo/web3/helpers/wagmi/fetchers/*',
              '@echo/web3/helpers/wagmi/providers/*'
            ],
            message: 'Use mocks instead'
          }
        ]
      }
    ]
  }
}
