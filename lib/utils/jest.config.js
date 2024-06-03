/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageReporters: ['json-summary', 'text'],
  coverageDirectory: '<rootDir>/../../.coverage/lib/utils',
  moduleNameMapper: {
    '^@echo/utils/(.*)$': '<rootDir>/src/$1',
    '^@echo/utils-test/(.*)$': '<rootDir>/test/@utils/$1',
    '^@echo/web3/(.*)$': '<rootDir>/../web3/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/utils'
      }
    ]
  ]
}
