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
    '^@echo/utils/(.*)$': '<rootDir>/src/$1'
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
