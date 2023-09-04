import { userListingsUrl } from '../../src/routing/user-listings-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userListingsUrl', () => {
  test('throws if id is empty', () => {
    expect(() => userListingsUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userListingsUrl('test')).toStrictEqual(new URL('https://test.com/user/test/listings'))
  })
})
