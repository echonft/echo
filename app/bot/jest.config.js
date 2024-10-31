// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/bot/(.*)$': '<rootDir>/src/$1',
    '^@echo/api/(.*)$': '<rootDir>/../../lib/api/src/$1',
    '^@echo/backend/(.*)$': '<rootDir>/../../lib/backend/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/nft-scan/(.*)$': '<rootDir>/../../lib/nft-scan/src/$1',
    '^@echo/opensea/(.*)$': '<rootDir>/../../lib/opensea/src/$1',
    '^@echo/routing/(.*)$': '<rootDir>/../../lib/routing/src/$1',
    '^@echo/tasks/(.*)$': '<rootDir>/../../lib/tasks/src/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../../lib/ui/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1',
    '^@echo/web3/(.*)$': '<rootDir>/../../lib/web3/src/$1',
    '^@echo/web3-dom/(.*)$': '<rootDir>/../../lib/utils/src/$1'
  }
}
