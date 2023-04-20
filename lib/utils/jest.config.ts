import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  reporters: [
    'default',
    ['github-actions', { silent: false }],
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../../coverage/lib/utils'
      }
    ],
    'summary'
  ],
  coverageDirectory: '<rootDir>/../../coverage/lib/utils'
}
export default config
