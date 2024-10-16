// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/bot/(.*)$': '<rootDir>/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/routing/(.*)$': '<rootDir>/../../lib/routing/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1'
  }
}
