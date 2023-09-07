import { nftCollectionOffersApiUrl } from '../../src/routing/nft-collection-offers-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - nftCollectionOffersApiUrl', () => {
  test('throws if slug is empty', () => {
    expect(() => nftCollectionOffersApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(nftCollectionOffersApiUrl('test')).toStrictEqual(new URL('https://test.com/collection/test/offers'))
  })
})
