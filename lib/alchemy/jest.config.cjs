/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/alchemy',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/alchemy/(.*)$': '<rootDir>/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../model/test/@mocks/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/alchemy'
      }
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts']
}
