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
  maxConcurrency: 1,
  maxWorkers: 1,
  moduleNameMapper: {
    '^@echo/firestore/(.*)$': '<rootDir>/src/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/test/mocks/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../model/test/mocks/$1',
    '^@test-utils/(.*)$': '<rootDir>/test/test-utils/$1',
    '^@echo/test-utils/(.*)$': '<rootDir>/../utils/test/test-utils/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1'
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
