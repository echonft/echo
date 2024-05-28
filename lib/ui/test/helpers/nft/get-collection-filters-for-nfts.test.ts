import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-collection-filters-for-nfts'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - getCollectionFiltersForNfts', () => {
  test('returns the right collection filters for a mock nfts', () => {
    const filters = getCollectionFiltersForNfts(getAllNftMocks())
    const pxCollection = getCollectionMockById(COLLECTION_MOCK_PX_ID)
    const sfCollection = getCollectionMockById(COLLECTION_MOCK_SPIRAL_ID)
    expect(filters).toEqual([
      {
        collection: pxCollection,
        count: 3,
        id: pxCollection.slug,
        label: pxCollection.name
      },
      {
        collection: sfCollection,
        count: 3,
        id: sfCollection.slug,
        label: sfCollection.name
      }
    ])
  })
})
