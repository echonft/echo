// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/web3/(.*)$': '<rootDir>/src/$1',
    '^@echo/backend/(.*)$': '<rootDir>/../backend/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../firestore/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/nft-scan/(.*)$': '<rootDir>/../nft-scan/src/$1',
    '^@echo/routing/(.*)$': '<rootDir>/../routing/src/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../ui/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@echo/web3-dom/(.*)$': '<rootDir>/../web3-dom/src/$1'
  }
}
