import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - collection - findCollectionById', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findCollectionById('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given id', async () => {
    const collection = await findCollectionById('Rc8pLQXxgyQGIRL0fr13')
    expect(collection).toStrictEqual(collectionMock.Rc8pLQXxgyQGIRL0fr13)
  })
})
