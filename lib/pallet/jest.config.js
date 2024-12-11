// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/firestore/(.*)$': '<rootDir>/../firestore/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/routing/*': '<rootDir>/../routing/src/*',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@echo/web3-dom/(.*)$': '<rootDir>/../web3-dom/src/$1'
  }
}
