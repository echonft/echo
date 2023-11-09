import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - collection - findCollectionBySlug', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findCollectionBySlug('not-found')
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given slug', async () => {
    const collection = await findCollectionBySlug('pxmythics-genesis')
    expect(collection).toStrictEqual(getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'))
  })
})
