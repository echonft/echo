import type { Config } from 'jest'

const config: Config = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testTimeout: 15000
}
export default config
