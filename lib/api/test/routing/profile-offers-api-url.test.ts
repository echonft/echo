import { profileOffersApiUrl } from '../../src/routing/profile-offers-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - profileOffersApiUrl', () => {
  test('returns proper URL', () => {
    expect(profileOffersApiUrl()).toStrictEqual(new URL('https://test.com/profile/offers'))
  })
})
