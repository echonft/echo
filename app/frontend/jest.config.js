// @ts-check
/** @type {import('jest').Config} */
export default {
  collectCoverage: Boolean(process.env.CI),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/api/(.*)$': '<rootDir>/../../lib/api/src/$1',
    '^@echo/auth/(.*)$': '<rootDir>/../../lib/auth/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/frontend/(.*)$': '<rootDir>/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/nft-scan/(.*)$': '<rootDir>/../../lib/nft-scan/src/$1',
    '^@echo/opensea/(.*)$': '<rootDir>/../../lib/opensea/src/$1',
    '^@echo/tasks/(.*)$': '<rootDir>/../../lib/tasks/src/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../../lib/ui/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1',
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
