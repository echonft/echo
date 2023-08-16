import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/test.old/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/__tests__/**',
    '!<rootDir>/src/**/__mocks__/**'
  ],
  coverageReporters: ['json-summary', 'text'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/firestore'
      }
    ]
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/firestore',
  testTimeout: 30000
}
export default config
