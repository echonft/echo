import { getUserNonceUrl } from '../../src'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - getUserNonceUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(getUserNonceUrl()).toStrictEqual(new URL('https://test.com/user/nonce'))
  })
})
