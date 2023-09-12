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
  coverageDirectory: '<rootDir>/../../.coverage/app/bot',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/discord/(.*)$': '<rootDir>/../../lib/discord/exports/$1',
    '^@echo-discord/(.*)$': '<rootDir>/../../lib/discord/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/exports/$1',
    '^@echo-utils/(.*)$': '<rootDir>/../../lib/utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/app/bot'
      }
    ]
  ]
}
export default config
