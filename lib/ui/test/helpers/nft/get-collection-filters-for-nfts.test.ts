import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-collection-filters-for-nfts'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - getCollectionFiltersForNfts', () => {
  test('returns the right collection filters for a mock nfts', () => {
    const filters = getCollectionFiltersForNfts(getAllNftMocks())
    const pxCollection = getCollectionMockById(COLLECTION_MOCK_PX_ID)
    const sfCollection = getCollectionMockById(COLLECTION_MOCK_SPIRAL_ID)
    const pxFilter: CollectionFilter = {
      count: 3,
      id: pxCollection.slug,
      label: pxCollection.name
    }
    const sfFilter: CollectionFilter = {
      count: 3,
      id: sfCollection.slug,
      label: sfCollection.name
    }
    expect(filters).toEqual([pxFilter, sfFilter])
  })
})
