/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/ui',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/alchemy/(.*)$': '<rootDir>/../alchemy/src/$1',
    '^@echo/api/(.*)$': '<rootDir>/../api/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/ui/(.*)$': '<rootDir>/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@echo/web3/(.*)$': '<rootDir>/../web3/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/ui'
      }
    ]
  ]
}
