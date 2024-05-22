import { getCollectionById } from '@echo/firestore/crud/collection/get-collection-by-id'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - collection - getCollectionById', () => {
  it('returns undefined if the collection is not found', async () => {
    const collection = await getCollectionById('not-found')
    expect(collection).toBeUndefined()
  })
  it('returns the collection with the given id', async () => {
    const collection = await getCollectionById('Rc8pLQXxgyQGIRL0fr13')
    expect(collection).toStrictEqual(collectionMock.Rc8pLQXxgyQGIRL0fr13)
  })
})
