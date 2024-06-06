/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: Boolean(process.env.CI),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '<rootDir>/test/.coverage',
  coverageReporters: ['json-summary', 'text'],
  moduleNameMapper: {
    '^@echo/model/(.*)$': '<rootDir>/../model/src/$1',
    '^@echo/utils/(.*)$': '<rootDir>/../utils/src/$1',
    '^@echo/web3/(.*)$': '<rootDir>/src/$1'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/test/.coverage'
      }
    ]
  ]
}
