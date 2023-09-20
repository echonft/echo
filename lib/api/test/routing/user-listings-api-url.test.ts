import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userListingsApiUrl', () => {
  test('throws if username is empty', () => {
    expect(() => userListingsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userListingsApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/user/test/listings'))
  })
})
