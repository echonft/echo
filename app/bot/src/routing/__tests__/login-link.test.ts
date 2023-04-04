import { loginLink } from '../login-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('@echo/api/dist/config/get-server-config', () => ({
  getServerConfig: () => ({
    url: 'https://echonft.xyz'
  })
}))

describe('Routing - loginLink', () => {
  test('returns login link with proper callback', () => {
    const callback = new URLSearchParams({ callback: 'https://echonft.xyz/collection/1' })
    expect(loginLink('1')).toEqual(`https://echonft.xyz/login?${callback.toString()}`)
  })
})
