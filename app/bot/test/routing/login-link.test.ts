import { loginLink } from '../../src/routing/login-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - loginLink', () => {
  test('returns login link with proper callback', () => {
    const callback = new URLSearchParams({ callbackUrl: 'https://echonft.xyz/collection/1' })
    expect(loginLink('1')).toEqual(`https://echonft.xyz/login?${callback.toString()}`)
  })
})
