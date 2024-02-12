import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - findCollectionById', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await findCollectionById('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given id', async () => {
    const collection = await findCollectionById('Rc8pLQXxgyQGIRL0fr13')
    expect(collection).toStrictEqual(collectionMock.Rc8pLQXxgyQGIRL0fr13)
  })
})
