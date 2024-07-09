// @ts-check
/** @type {import('jest').Config} */
export default {
  bail: true,
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
  globalSetup: '<rootDir>/test/global-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testTimeout: 30000
}
