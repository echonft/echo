import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { collectionMockPxId, collectionMockPxSlug } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollection', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollection('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given slug', async () => {
    const collection = await getCollection(collectionMockPxSlug())
    expect(collection).toStrictEqual(getCollectionMockById(collectionMockPxId()))
  })
})
