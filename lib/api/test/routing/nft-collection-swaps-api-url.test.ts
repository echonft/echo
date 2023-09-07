import { nftCollectionSwapsApiUrl } from '../../src/routing/nft-collection-swaps-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionSwapsApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => nftCollectionSwapsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionSwapsApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/swaps'))
  })
})
