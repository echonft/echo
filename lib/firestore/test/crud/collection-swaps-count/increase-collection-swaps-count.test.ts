import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { findCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-snapshot-by-collection-id'
import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertCollections } from '@test-utils/collection/assert-collections'
import { deleteCollection } from '@test-utils/collection/delete-collection'
import { assertCollectionSwapsCounts } from '@test-utils/collection-swaps-count/assert-collection-swaps-counts'
import { deleteCollectionSwapsCount } from '@test-utils/collection-swaps-count/delete-collection-swaps-count'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - collection-swaps-count - increaseCollectionSwapsCount', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  afterEach(async () => {
    await assertCollections()
    await assertCollectionSwapsCounts()
  })
  it('throws if trying to increase swaps count for a collection that does not exist', async () => {
    await expect(increaseCollectionSwapsCount('not-found')).rejects.toBeDefined()
  })
  it('if there is already a swap counts for the collectionId, increase it', async () => {
    const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
    const initialSwapsCount = (await findCollectionSwapsCountByCollectionId(collectionId))!
    await increaseCollectionSwapsCount(collectionId)
    const updatedSwapsCount = (await findCollectionSwapsCountByCollectionId(collectionId))!
    expect(updatedSwapsCount.collectionId).toEqual(collectionId)
    expect(updatedSwapsCount.swapsCount).toEqual(initialSwapsCount.swapsCount + 1)
    // reset the count
    const snapshot = await getCollectionSwapsCountSnapshotByCollectionId(collectionId)
    await snapshot?.ref.update({ swapsCount: initialSwapsCount.swapsCount })
  })
  it('if a swap counts does not exist for the collectionId, add it with the value of 1', async () => {
    const { id: collectionId } = await addCollection(omit(['id'], getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')))
    const initialSwapsCount = await findCollectionSwapsCountByCollectionId(collectionId)
    expect(initialSwapsCount).toBeUndefined()
    await increaseCollectionSwapsCount(collectionId)
    const updatedSwapsCount = (await findCollectionSwapsCountByCollectionId(collectionId))!
    // delete the newly created collection and swaps count
    await deleteCollection(collectionId)
    await deleteCollectionSwapsCount(updatedSwapsCount.id)
    expect(updatedSwapsCount.collectionId).toEqual(collectionId)
    expect(updatedSwapsCount.swapsCount).toEqual(1)
  })
})
