import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import { collectionDocumentMockPxId } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollectionById', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollectionById('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given id', async () => {
    const collection = await getCollectionById(collectionDocumentMockPxId)
    expect(collection).toStrictEqual(collectionDocumentMockPx)
  })
})
