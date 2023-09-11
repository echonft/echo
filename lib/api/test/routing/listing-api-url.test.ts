import { listingApiUrl } from '@echo-api/routing/listing-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - listingApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => listingApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(listingApiUrl('test')).toStrictEqual(new URL('https://test.com/listing/test'))
  })
})
