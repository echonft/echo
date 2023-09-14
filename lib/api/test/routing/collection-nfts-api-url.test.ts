import { collectionNftsApiUrl } from '@echo/api/routing/collection-nfts-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - collectionNftsApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => collectionNftsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(collectionNftsApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/items'))
  })
})
