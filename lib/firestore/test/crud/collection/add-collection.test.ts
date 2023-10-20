import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertCollections } from '@test-utils/collection/assert-collections'
import { deleteCollection } from '@test-utils/collection/delete-collection'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - collection - addCollection', () => {
  let collectionId: string
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertCollections()
    await tearDownRemoteFirestoreTests()
  })

  afterEach(async () => {
    try {
      await deleteCollection(collectionId)
    } catch (err) {
      throw Error(`error deleting nft collection ${collectionId}: ${errorMessage(err)}`)
    }
  })

  it('addNftCollection', async () => {
    const originalCollection = omit(['id'], getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'))
    const addedCollection = await addCollection(originalCollection)
    collectionId = addedCollection.id
    const collection = await findCollectionById(collectionId)
    expect(omit(['id'], collection)).toStrictEqual(originalCollection)
  })
})
