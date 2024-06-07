import { getCollectionSwapsCountMockByCollectionId } from '@echo/firestore/mocks/collection-swaps-count/get-collection-swaps-count-mock-by-collection-id'
import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('getCollectionSwapsCountByCollectionId', () => {
  it('returns an empty array if there is no document for the given collection id', async () => {
    const document = await getCollectionSwapsCountByCollectionId('not-found')
    expect(document).toEqual(undefined)
  })
  it('returns the swaps count associated with the collection id', async () => {
    const collectionId = collectionMockSpiralId()
    const document = await getCollectionSwapsCountByCollectionId(collectionId)
    expect(document).toStrictEqual(getCollectionSwapsCountMockByCollectionId(collectionMockSpiralId()))
  })
})
