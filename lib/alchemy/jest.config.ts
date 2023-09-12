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
  coverageDirectory: '<rootDir>/../../.coverage/lib/alchemy',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo-alchemy/(.*)$': '<rootDir>/src/$1',
    '^@echo-alchemy-test/(.*)$': '<rootDir>/test/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/exports/$1',
    '^@echo-utils/(.*)$': '<rootDir>/../utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/alchemy'
      }
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts']
}
export default config
