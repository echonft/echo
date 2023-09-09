import { userOffersApiUrl } from '../../src/routing/user-offers-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userOffersApiUrl', () => {
  test('throws if username is empty', () => {
    expect(() => userOffersApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userOffersApiUrl('test')).toStrictEqual(new URL('https://test.com/user/test/offers'))
  })
})
