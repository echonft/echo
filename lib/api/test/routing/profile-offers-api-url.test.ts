import { profileOffersApiUrl } from '@echo/api/routing/profile-offers-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - profileOffersApiUrl', () => {
  test('returns proper URL', () => {
    expect(profileOffersApiUrl()).toStrictEqual(new URL('https://echonft.xyz/api/profile/offers'))
  })
})
