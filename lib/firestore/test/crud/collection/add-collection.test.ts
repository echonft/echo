import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { assertCollections } from '@echo/firestore-test/collection/assert-collections'
import { deleteCollection } from '@echo/firestore-test/collection/delete-collection'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
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
