/** @type {import('jest').Config} */
module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/firestore',
  coverageReporters: ['json-summary', 'text'],
  globalSetup: '<rootDir>/test/global-setup.ts',
  maxConcurrency: 1,
  maxWorkers: 1,
  moduleNameMapper: {
    '^@echo/firestore/(.*)$': '<rootDir>/src/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/test/@mocks/$1',
    '^@echo/firestore-test/(.*)$': '<rootDir>/test/@utils/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../model/test/@mocks/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@echo/utils-test/(.*)$': '<rootDir>/../utils/test/@utils/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/firestore'
      }
    ]
  ],
  testTimeout: 30000
}
