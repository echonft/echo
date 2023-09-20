import { collectionApiUrl } from '@echo/api/routing/collection-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - collectionApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => collectionApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(collectionApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/collection/test'))
  })
})
