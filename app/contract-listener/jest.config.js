/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/app/contract-listener',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/contract-listener/(.*)$': '<rootDir>/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/../../lib/firestore/test/@mocks/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../../lib/model/test/@mocks/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1',
    '^@echo/web3/(.*)$': '<rootDir>/../../lib/web3/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/app/contract-listener'
      }
    ]
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/']
}
