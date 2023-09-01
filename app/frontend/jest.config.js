const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

/** @type {import('jest').Config} */
const customJestConfig = {
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   '<rootDir>/src/**/*.{ts,js,tsx,jsx}',
  //   '!<rootDir>/src/**/*.d.ts',
  //   '!<rootDir>/src/**/index.ts',
  //   '!<rootDir>/src/**/__tests__/**',
  //   '!<rootDir>/src/**/__mocks__/**'
  // ],
  // coverageReporters: ['json-summary','text'],
  // reporters: [
  //   'default',
  //   [
  //     'jest-junit',
  //     {
  //       outputDirectory: '<rootDir>/../../.coverage/app/frontend'
  //     }
  //   ]
  // ],
  // coverageDirectory: '<rootDir>/../../.coverage/app/frontend',
}

module.exports = createJestConfig(customJestConfig)
