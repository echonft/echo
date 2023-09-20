import { cancelOfferApiUrl } from '@echo/api/routing/cancel-offer-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - cancelOfferApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => cancelOfferApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(cancelOfferApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/cancel'))
  })
})
