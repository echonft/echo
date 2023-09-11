import { userSwapsApiUrl } from '../../src/routing/user-swaps-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - userSwapsApiUrl', () => {
  test('throws if username is empty', () => {
    expect(() => userSwapsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(userSwapsApiUrl('test')).toStrictEqual(new URL('https://test.com/user/test/swaps'))
  })
})
