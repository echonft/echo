// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverage: Boolean(process.env.CI),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/api/(.*)$': '<rootDir>/../api/src/$1',
    '^@echo/auth/(.*)$': '<rootDir>/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../firestore/src/$1',
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
  ]
}
