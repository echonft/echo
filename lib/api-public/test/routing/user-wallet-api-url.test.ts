import { userWalletApiUrl } from '../../src/routing/user-wallet-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userWalletApiUrl', () => {
  test('returns proper URL', () => {
    expect(userWalletApiUrl()).toStrictEqual(new URL('https://test.com/user/me/wallet'))
  })
})
