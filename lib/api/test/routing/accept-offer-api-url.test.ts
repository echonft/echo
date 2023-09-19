import { acceptOfferApiUrl } from '@echo/api/routing/accept-offer-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - acceptOfferApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => acceptOfferApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(acceptOfferApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/accept'))
  })
})
