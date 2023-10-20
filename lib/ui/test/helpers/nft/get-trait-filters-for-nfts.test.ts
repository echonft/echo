import { type Nft } from '@echo/model/types/nft'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - getTraitFiltersForNfts', () => {
  test('returns the right traits for a set of nfts', () => {
    const nft1: Nft = {
      attributes: [
        { trait: 'traitB', value: '1' },
        { trait: 'traitA', value: '2' }
      ]
    } as unknown as Nft
    const nft2 = {
      attributes: [
        { trait: 'traitA', value: '1' },
        { trait: 'traitB', value: '1' }
      ]
    } as unknown as Nft
    const nft3 = { attributes: [{ trait: 'traitC', value: '1' }] } as unknown as Nft
    expect(getTraitFiltersForNfts([nft1, nft2, nft3])).toEqual([
      { trait: 'traitA', value: '1', count: 1 },
      { trait: 'traitA', value: '2', count: 1 },
      { trait: 'traitB', value: '1', count: 2 },
      { trait: 'traitC', value: '1', count: 1 }
    ])
  })
})
