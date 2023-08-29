import { userNonceApiUrl } from '../../src/routing/user-nonce-api-url'
import { setupEnv } from '../setup-env'
import { beforeEach, describe, expect, test } from '@jest/globals'

describe('routing - userNonceApiUrl', () => {
  beforeEach(() => {
    setupEnv()
  })

  test('returns proper URL', () => {
    expect(userNonceApiUrl()).toStrictEqual(new URL('https://test.com/user/nonce'))
  })
})
