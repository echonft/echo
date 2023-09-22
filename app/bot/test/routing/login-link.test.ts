import { loginLink } from '@echo/bot/routing/login-link'
import { describe, expect, test } from '@jest/globals'

describe('Routing - loginLink', () => {
  test('returns login link with proper callback', () => {
    const callback = new URLSearchParams({ callbackUrl: 'https://echonft.xyz/collection/1/items' })
    expect(loginLink('1')).toEqual(`https://echonft.xyz/login?${callback.toString()}`)
  })
})
