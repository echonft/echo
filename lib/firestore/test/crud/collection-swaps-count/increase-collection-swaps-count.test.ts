import { findCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-snapshot-by-collection-id'
import { increaseCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/increase-collection-swaps-count'
import { assertCollections } from '@echo/firestore-test/collection/assert-collections'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'

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
})
