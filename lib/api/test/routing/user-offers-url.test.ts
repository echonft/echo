import { userOffersUrl } from '../../src/routing/user-offers-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userOffersUrl', () => {
  test('throws if id is empty', () => {
    expect(() => userOffersUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userOffersUrl('test')).toStrictEqual(new URL('https://test.com/user/test/offers'))
  })
})
