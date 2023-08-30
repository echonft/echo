import { apiBaseUrl } from '../../src/routing/api-base-url'
import { afterAll, beforeEach, describe, expect, jest, test } from '@jest/globals'

describe('routing - apiBaseUrl', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  test('if no NEXT_PUBLIC_API_URL, throws', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete process.env.NEXT_PUBLIC_API_URL
    expect(() => apiBaseUrl()).toThrow(Error('.env should contain NEXT_PUBLIC_API_URL'))
  })
  test('if NEXT_PUBLIC_API_URL exists, returns value', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://test.com'
    expect(apiBaseUrl()).toBe('https://test.com')
  })
})
