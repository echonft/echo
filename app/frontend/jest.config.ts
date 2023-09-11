import type { Config } from 'jest'

const config: Config = {
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
  coverageDirectory: '<rootDir>/../../.coverage/app/frontend',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@constants/(.*)$': '<rootDir>/src/lib/constants/$1',
    '^@helpers/(.*)$': '<rootDir>/src/lib/helpers/$1',
    '^@mocks/(.*)$': '<rootDir>/test/mocks/$1',
    '^@server/(.*)$': '<rootDir>/src/lib/server/$1',
    '^@type/(.*)$': '<rootDir>/src/lib/types/$1',
    '^@echo/alchemy/(.*)$': '<rootDir>/../../lib/alchemy/exports/$1',
    '^@echo-alchemy/(.*)$': '<rootDir>/../../lib/alchemy/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/app/frontend'
      }
    ]
  ],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
}
export default config
