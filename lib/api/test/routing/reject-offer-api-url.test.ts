import { rejectOfferApiUrl } from '@echo/api/routing/reject-offer-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - rejectOfferApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => rejectOfferApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(rejectOfferApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/reject'))
  })
})
