import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { assertCollections } from '@echo/firestore-test/collection/assert-collections'
import { deleteCollection } from '@echo/firestore-test/collection/delete-collection'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { deleteCollectionSwapsCount } from '@echo/firestore-test/collection-swaps-count/delete-collection-swaps-count'
import { findCollectionSwapsCountByCollectionId } from '@echo/firestore-test/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - collection - addCollection', () => {
  let collectionId: string
  let addedSwapsCountId: string
  beforeAll(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  afterAll(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  afterEach(async () => {
    try {
      await deleteCollection(collectionId)
    } catch (err) {
      throw Error(`error deleting collection ${collectionId}: ${errorMessage(err)}`)
    }
    try {
      await deleteCollectionSwapsCount(addedSwapsCountId)
    } catch (err) {
      throw Error(`error deleting collection swaps count ${addedSwapsCountId}: ${errorMessage(err)}`)
    }
  })

  it('addCollection', async () => {
    const originalCollection = omit(['id'], getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'))
    const addedCollection = await addCollection(originalCollection)
    collectionId = addedCollection.id
    const collection = await findCollectionById(collectionId)
    expect(omit(['id'], collection)).toStrictEqual(originalCollection)
    // assert that the collection swaps count was added
    const swapsCount = await findCollectionSwapsCountByCollectionId(collectionId)
    addedSwapsCountId = swapsCount!.id
    expect(omit(['id'], swapsCount)).toStrictEqual({
      collectionId,
      swapsCount: 0
    })
  })
})
