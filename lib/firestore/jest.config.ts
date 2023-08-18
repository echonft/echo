import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/__tests__/**',
    '!<rootDir>/src/**/__mocks__/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/firestore',
  coverageReporters: ['json-summary', 'text'],
  maxConcurrency: 1,
  maxWorkers: 1,
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
