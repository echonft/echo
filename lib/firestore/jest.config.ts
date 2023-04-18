import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  reporters: ['default', ['github-actions', { silent: false }], 'summary']
}
export default config
