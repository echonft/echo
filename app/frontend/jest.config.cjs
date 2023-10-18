/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/app/frontend',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@constants/(.*)$': '<rootDir>/src/lib/constants/$1',
    '^@helpers/(.*)$': '<rootDir>/src/lib/helpers/$1',
    '^@server/(.*)$': '<rootDir>/src/lib/server/$1',
    '^@server-mocks/(.*)$': '<rootDir>/test/lib/server/mocks/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@type/(.*)$': '<rootDir>/src/lib/types/$1',
    '^@echo/alchemy/(.*)$': '<rootDir>/../../lib/alchemy/src/$1',
    '^@echo/api/(.*)$': '<rootDir>/../../lib/api/src/$1',
    '^@echo/discord/(.*)$': '<rootDir>/../../lib/discord/src/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../../lib/model/test/mocks/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/../../lib/firestore/test/mocks/$1',
    '^@echo/test-utils/(.*)$': '<rootDir>/../../lib/utils/test/test-utils/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../../lib/utils/ui/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1'
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
