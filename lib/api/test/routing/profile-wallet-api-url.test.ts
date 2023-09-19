import { profileWalletApiUrl } from '@echo/api/routing/profile-wallet-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - profileWalletApiUrl', () => {
  test('returns proper URL', () => {
    expect(profileWalletApiUrl()).toStrictEqual(new URL('https://echonft.xyz/api/profile/wallet'))
  })
})
