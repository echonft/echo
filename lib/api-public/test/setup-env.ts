import { jest } from '@jest/globals'

export const setupEnv = () => {
  jest.resetModules() // Most important - it clears the cache
  process.env = { ...process.env, NEXT_PUBLIC_API_URL: 'https://test.com' } // Make a copy
}
