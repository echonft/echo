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
    '^@echo/test/firestore/(.*)$': '<rootDir>/test/$1',
    '^@echo/backend/(.*)$': '<rootDir>/../backend/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/nft-scan/(.*)$': '<rootDir>/../nft-scan/src/$1',
    '^@echo/opensea/(.*)$': '<rootDir>/../opensea/src/$1',
    '^@echo/routing/(.*)$': '<rootDir>/../routing/src/$1',
    '^@echo/tasks/(.*)$': '<rootDir>/../tasks/src/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../ui/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@echo/web3/(.*)$': '<rootDir>/../web3/src/$1',
    '^@echo/web3-dom/(.*)$': '<rootDir>/../web3-dom/src/$1'
  },
  globalSetup: '<rootDir>/test/global-setup.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setup-after-env.ts'],
  testTimeout: 30000
}
