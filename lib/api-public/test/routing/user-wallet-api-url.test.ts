import { userWalletApiUrl } from '../../src/routing/user-wallet-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - userWalletApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(userWalletApiUrl()).toStrictEqual(new URL('https://test.com/user/me/wallet'))
  })
})
