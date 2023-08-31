import { nftCollectionListingsApiUrl } from '../../src/routing/nft-collection-listings-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionListingsApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => nftCollectionListingsApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionListingsApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/listings'))
  })
})
