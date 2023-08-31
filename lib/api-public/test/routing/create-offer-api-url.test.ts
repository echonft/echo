import { createOfferApiUrl } from '../../src/routing/create-offer-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - createOfferApiUrl', () => {
  test('returns proper URL', () => {
    expect(createOfferApiUrl()).toStrictEqual(new URL('https://test.com/offer'))
  })
})
