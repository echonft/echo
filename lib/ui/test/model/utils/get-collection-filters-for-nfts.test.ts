import { getCollectionFiltersForNfts } from '../../../src/model/utils/get-collection-filters-for-nfts'
import { nfts } from '@echo/model'
import { describe, expect, test } from '@jest/globals'

describe('model - utils - getCollectionFiltersForNfts', () => {
  test('returns the right collection filters for a set of nfts', () => {
    const nft1 = nfts['QFjMRNChUAHNswkRADXh']!
    const nft2 = nfts['8hHFadIrrooORfTOLkBg']!
    const nftArray = [nft1, nft2, nft1, nft1]
    const filters = getCollectionFiltersForNfts(nftArray)
    expect(filters.length).toBe(2)
    expect(filters[0]).toEqual({ id: 'Rc8pLQXxgyQGIRL0fr13', name: 'pxMythics Genesis', count: 3 })
    expect(filters[1]).toEqual({ id: '1aomCtnoesD7WVll6Yi1', name: 'Spiral Frequencies', count: 1 })
  })
})
