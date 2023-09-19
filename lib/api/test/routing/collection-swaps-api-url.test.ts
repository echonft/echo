import { collectionSwapsApiUrl } from '@echo/api/routing/collection-swaps-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - collectionSwapsApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => collectionSwapsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(collectionSwapsApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/collection/test/swaps'))
  })
})
