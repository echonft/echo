import { isErc721Nft } from '@echo/model/helpers/nft/is-erc721-nft'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-collection-filters-for-nfts'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { describe, expect, test } from '@jest/globals'
import { filter, pipe } from 'ramda'

describe('helpers - nft - getCollectionFiltersForNfts', () => {
  test('returns the right collection filters for a mock nfts', () => {
    const filters = pipe(filter(isErc721Nft), getCollectionFiltersForNfts)(nftMocks)
    const pxFilter: CollectionFilter = {
      count: 3,
      id: collectionMockPx.slug,
      label: collectionMockPx.name
    }
    const sfFilter: CollectionFilter = {
      count: 3,
      id: collectionMockSpiral.slug,
      label: collectionMockSpiral.name
    }
    expect(filters).toEqual([pxFilter, sfFilter])
  })
})
