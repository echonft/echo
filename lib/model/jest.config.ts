import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js,tsx,jsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/__tests__/**',
    '!<rootDir>/src/**/__mocks__/**',
    '!<rootDir>/src/**/mocks/**',
    '!<rootDir>/test/**'
  ],
  coverageReporters: ['json-summary', 'text'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/model'
      }
    ]
  ],
  coverageDirectory: '<rootDir>/../../.coverage/lib/model'
}
export default config
