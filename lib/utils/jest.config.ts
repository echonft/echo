import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  coverageDirectory: '<rootDir>/../../coverage/lib/utils'
}
export default config
