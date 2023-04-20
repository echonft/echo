import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  coverageReporters: ['json-summary'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../coverage/lib/utils'
      }
    ]
  ],
  coverageDirectory: '<rootDir>/../../coverage/lib/utils'
}
export default config
