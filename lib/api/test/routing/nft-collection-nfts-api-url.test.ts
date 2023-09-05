import { nftCollectionNftsApiUrl } from '../../src/routing/nft-collection-nfts-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionNftsApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => nftCollectionNftsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionNftsApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/items'))
  })
})
