import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

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
