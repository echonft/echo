import { offerApiUrl } from '@echo/api/routing/offer-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - offerApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => offerApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(offerApiUrl('test')).toStrictEqual(new URL('https://test.com/offer/test'))
  })
})
