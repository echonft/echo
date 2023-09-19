import { profileNonceApiUrl } from '@echo/api/routing/profile-nonce-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - profileNonceApiUrl', () => {
  test('returns proper URL', () => {
    expect(profileNonceApiUrl()).toStrictEqual(new URL('https://echonft.xyz/api/profile/nonce'))
  })
})
