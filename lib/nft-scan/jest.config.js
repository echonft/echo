// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/nft-scan/(.*)$': '<rootDir>/src/$1',
    '^@echo/routing/(.*)$': '<rootDir>/../routing/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts']
}
