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
  coverageDirectory: '<rootDir>/../../.coverage/lib/ui',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/api/(.*)$': '<rootDir>/../api/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/ui/(.*)$': '<rootDir>/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/lib/ui'
      }
    ]
  ]
}
export default config
