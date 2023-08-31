import { userNonceApiUrl } from '../../src/routing/user-nonce-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userNonceApiUrl', () => {
  test('returns proper URL', () => {
    expect(userNonceApiUrl()).toStrictEqual(new URL('https://test.com/user/me/nonce'))
  })
})
