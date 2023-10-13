import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { collectionMock } from '@echo/firestore-mocks/collection/collection-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

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
