import { getUserWalletUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getUserWalletUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getUserWalletUrl()).toStrictEqual(new URL('https://test.com/user/wallet'))
  })
})
