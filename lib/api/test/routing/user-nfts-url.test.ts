import { userListingsApiUrl } from '../../src/routing/user-listings-api-url'
import { userNftsApiUrl } from '../../src/routing/user-nfts-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userNftsApiUrl', () => {
  test('throws if username is empty', () => {
    expect(() => userNftsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userListingsApiUrl('test')).toStrictEqual(new URL('https://test.com/user/test/listings'))
  })
})
