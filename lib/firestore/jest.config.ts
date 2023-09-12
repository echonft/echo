import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/__tests__/**',
    '!<rootDir>/src/**/test/**',
    '!<rootDir>/src/**/__mocks__/**',
    '!<rootDir>/src/**/mocks/**',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/firestore',
  coverageReporters: ['json-summary', 'text'],
  maxConcurrency: 1,
  maxWorkers: 1,
  moduleNameMapper: {
    '^@echo/utils/(.*)$': '<rootDir>/../utils/exports/$1',
    '^@echo-utils/(.*)$': '<rootDir>/../utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/firestore'
      }
    ]
  ],
  testTimeout: 30000
}
export default config
