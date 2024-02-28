import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - getCollectionFiltersForNfts', () => {
  test('returns the right collection filters for a mock nfts', () => {
    const filters = getCollectionFiltersForNfts(getAllNftMocks())
    const pxCollection = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const sfCollection = getCollectionMockById('1aomCtnoesD7WVll6Yi1')
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
