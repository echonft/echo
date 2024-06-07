// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverage: Boolean(process.env.CI),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/api/(.*)$': '<rootDir>/../../lib/api/src/$1',
    '^@echo/bot/(.*)$': '<rootDir>/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../../lib/model/test/@mocks/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/../../lib/firestore/test/@mocks/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1'
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
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts']
}
