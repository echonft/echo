import { addNftCollection } from '@echo/firestore/crud/nft-collection/add-nft-collection'
import { deleteNftCollection } from '@echo/firestore/crud/nft-collection/delete-nft-collection'
import { deleteNftCollectionSwapsCount } from '@echo/firestore/crud/nft-collection-swaps-count/delete-nft-collection-swaps-count'
import { findNftCollectionSwapsCountByNftCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/find-nft-collection-swaps-count-by-nft-collection-id'
import { getNftCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-collection-id'
import { increaseNftCollectionSwapsCount } from '@echo/firestore/crud/nft-collection-swaps-count/increase-nft-collection-swaps-count'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertNftCollectionSwapsCounts } from '@test-utils/nft-collection-swaps-count/assert-nft-collection-swaps-counts'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - nft-collection-swaps-count - addNftCollectionDiscordGuild', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNftCollectionSwapsCounts()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to increase swaps count for a collection that does not exist', async () => {
    await expect(increaseNftCollectionSwapsCount('not-found')).rejects.toBeDefined()
  })
  it('if there is already a swap counts for the collectionId, increase it', async () => {
    const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
    const initialSwapsCount = await findNftCollectionSwapsCountByNftCollectionId(collectionId)
    await increaseNftCollectionSwapsCount(collectionId)
    const updatedSwapsCount = await findNftCollectionSwapsCountByNftCollectionId(collectionId)
    expect(updatedSwapsCount!.collectionId).toEqual(collectionId)
    expect(updatedSwapsCount!.swapsCount).toEqual(initialSwapsCount!.swapsCount + 1)
    // reset the count
    const snapshot = await getNftCollectionSwapsCountSnapshotByCollectionId(collectionId)
    await snapshot?.ref.update({ swapsCount: initialSwapsCount!.swapsCount })
  })
  it('if a swap counts does not exist for the collectionId, add it with the value of 1', async () => {
    const collectionId = await addNftCollection(omit(['id'], getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')))
    const initialSwapsCount = await findNftCollectionSwapsCountByNftCollectionId(collectionId)
    expect(initialSwapsCount).toBeUndefined()
    await increaseNftCollectionSwapsCount(collectionId)
    const updatedSwapsCount = await findNftCollectionSwapsCountByNftCollectionId(collectionId)
    // delete the newly created collection and swaps count
    await deleteNftCollection(collectionId)
    await deleteNftCollectionSwapsCount(updatedSwapsCount!.id)
    expect(updatedSwapsCount!.collectionId).toEqual(collectionId)
    expect(updatedSwapsCount!.swapsCount).toEqual(1)
  })
})
