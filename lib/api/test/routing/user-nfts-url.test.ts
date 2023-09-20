import { userListingsApiUrl } from '@echo/api/routing/user-listings-api-url'
import { userNftsApiUrl } from '@echo/api/routing/user-nfts-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userNftsApiUrl', () => {
  test('throws if username is empty', () => {
    expect(() => userNftsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userListingsApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/user/test/listings'))
  })
})
