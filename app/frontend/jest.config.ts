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
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@constants/(.*)$': '<rootDir>/src/lib/constants/$1',
    '^@helpers/(.*)$': '<rootDir>/src/lib/helpers/$1',
    '^@server/(.*)$': '<rootDir>/src/lib/server/$1',
    '^@type/(.*)$': '<rootDir>/src/lib/types/$1'
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
  coverageDirectory: '<rootDir>/../../.coverage/app/frontend',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  }
}
export default config
