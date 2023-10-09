import { updateOfferApiUrl } from '@echo/api/routing/update-offer-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - updateOfferApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => updateOfferApiUrl('', 'ACCEPT')).toThrow()
  })

  test('throws if action is invalid', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => updateOfferApiUrl('test', 'TEST')).toThrow()
  })

  test('returns accept URL with accept action', () => {
    expect(updateOfferApiUrl('test', 'ACCEPT')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/accept'))
  })

  test('returns reject URL with reject action', () => {
    expect(updateOfferApiUrl('test', 'REJECT')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/reject'))
  })

  test('returns cancel URL with cancel action', () => {
    expect(updateOfferApiUrl('test', 'CANCEL')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/cancel'))
  })
})
