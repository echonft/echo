import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_PX_SLUG } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollection', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollection('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given slug', async () => {
    const collection = await getCollection(COLLECTION_MOCK_PX_SLUG)
    expect(collection).toStrictEqual(getCollectionMockById(COLLECTION_MOCK_PX_ID))
  })
})
