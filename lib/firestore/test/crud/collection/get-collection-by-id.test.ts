import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionMockPxId } from '@echo/firestore/mocks/db-model/collection-document-data-mock'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollectionById', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollectionById('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given id', async () => {
    const collection = await getCollectionById(collectionMockPxId())
    expect(collection).toStrictEqual(collectionMockPx)
  })
})
