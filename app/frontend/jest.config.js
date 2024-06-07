// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverage: Boolean(process.env.CI),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/api/(.*)$': '<rootDir>/../../lib/api/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/../../lib/firestore/test/@mocks/$1',
    '^@echo/frontend/(.*)$': '<rootDir>/src/$1',
    '^@echo/frontend-mocks/(.*)$': '<rootDir>/test/@mocks/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../../lib/model/test/@mocks/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../../lib/ui/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1',
    '^@echo/utils-test/(.*)$': '<rootDir>/../../lib/utils/test/@utils/$1',
    '^@echo/web3/(.*)$': '<rootDir>/../../lib/web3/src/$1'
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
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
}
