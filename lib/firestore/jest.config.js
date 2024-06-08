// @ts-check
/** @type {import('jest').Config} */
export default {
  bail: true,
  collectCoverage: Boolean(process.env.CI),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  maxConcurrency: 1,
  maxWorkers: 1,
  moduleNameMapper: {
    '^@echo/firestore/(.*)$': '<rootDir>/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/test/.coverage'
      }
    ]
  ],
  globalSetup: '<rootDir>/test/global-setup.ts',
  globalTeardown: '<rootDir>/test/global-teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testTimeout: 30000
}
