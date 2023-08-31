import { userApiUrl } from '../../src/routing/user-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => userApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userApiUrl('test')).toStrictEqual(new URL('https://test.com/user/test'))
  })
})
