// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/auth/(.*)$': '<rootDir>/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../firestore/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/routing/(.*)$': '<rootDir>/../routing/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1'
  }
}
