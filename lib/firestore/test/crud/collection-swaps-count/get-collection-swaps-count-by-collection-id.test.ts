import { getCollectionSwapsCountMockByCollectionId } from '@echo/firestore-mocks/collection-swaps-count/get-collection-swaps-count-mock-by-collection-id'
import { getCollectionSwapsCountByCollectionId } from '@echo/firestore-test/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { describe, expect, it } from '@jest/globals'

describe('getCollectionSwapsCountByCollectionId', () => {
  it('returns an empty array if there is no document for the given collection id', async () => {
    const document = await getCollectionSwapsCountByCollectionId('not-found')
    expect(document).toEqual(undefined)
  })
  it('returns the swaps count associated with the collection id', async () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const document = await getCollectionSwapsCountByCollectionId(collectionId)
    expect(document).toStrictEqual(getCollectionSwapsCountMockByCollectionId('1aomCtnoesD7WVll6Yi1'))
  })
})
