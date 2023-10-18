/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/types/**'
  ],
  coverageDirectory: '<rootDir>/../../.coverage/app/bot',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/bot/(.*)$': '<rootDir>/src/$1',
    '^@echo/bot-mocks/(.*)$': '<rootDir>/test/mocks/$1',
    '^@echo/bot-test/(.*)$': '<rootDir>/test/utils/$1',
    '^@echo/discord/(.*)$': '<rootDir>/../../lib/discord/src/$1',
    '^@echo/model/(.*)$': '<rootDir>/../../lib/model/src/$1',
    '^@echo/model-mocks/(.*)$': '<rootDir>/../../lib/model/test/mocks/$1',
    '^@echo/firestore/(.*)$': '<rootDir>/../../lib/firestore/src/$1',
    '^@echo/firestore-mocks/(.*)$': '<rootDir>/../../lib/firestore/test/mocks/$1',
    '^@echo/ui/(.*)$': '<rootDir>/../../lib/ui/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../../lib/utils/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../.coverage/app/bot'
      }
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts']
}
