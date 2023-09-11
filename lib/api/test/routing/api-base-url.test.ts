import { apiBaseUrl } from '@echo-api/routing/api-base-url'
import { describe, expect, jest, test } from '@jest/globals'

describe('routing - apiBaseUrl', () => {
  test('if no NEXT_PUBLIC_API_URL, throws', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, NEXT_PUBLIC_API_URL: undefined })
    expect(() => apiBaseUrl()).toThrow(Error('.env should contain NEXT_PUBLIC_API_URL'))
    replacedEnv.restore()
  })
  test('if NEXT_PUBLIC_API_URL exists, returns value', () => {
    expect(apiBaseUrl()).toBe('https://test.com')
  })
})
