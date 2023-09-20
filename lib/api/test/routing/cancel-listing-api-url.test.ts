import { cancelListingApiUrl } from '@echo/api/routing/cancel-listing-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - cancelListingApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => cancelListingApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(cancelListingApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/listing/test/cancel'))
  })
})
