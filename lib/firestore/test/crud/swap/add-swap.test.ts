import { findCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountSnapshotById } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-snapshot-by-id'
import { addSwap } from '@echo/firestore/crud/swaps/add-swap'
import { deleteSwap } from '@echo/firestore/crud/swaps/delete-swap'
import { findSwapById } from '@echo/firestore/crud/swaps/find-swap-by-id'
import { getOfferCollectionIds } from '@echo/model/helpers/offer/get-offer-collection-ids'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertCollectionSwapsCounts } from '@test-utils/collection-swaps-count/assert-collection-swaps-counts'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { map } from 'ramda'

describe('CRUD - swap - addSwap', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertSwaps()
    await assertCollectionSwapsCounts()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a swap for an offer that does not exist', async () => {
    await expect(addSwap('not-found', '0xnew')).rejects.toBeDefined()
  })
  it('throws if trying to add a swap for an offer that already has a swap', async () => {
    await expect(addSwap('ASkFpKoHEHVH0gd69t1G', '0x100')).rejects.toBeDefined()
  })
  it('add a swap', async () => {
    const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
    const offer = getOfferMockById(offerId)
    const collectionIds = getOfferCollectionIds(offer)
    const initialSwapsCounts = await Promise.all(
      map(async (collectionId) => {
        return (await findCollectionSwapsCountByCollectionId(collectionId))!
      }, collectionIds)
    )
    const { id } = await addSwap(offerId, '0xnew')
    const newSwap = (await findSwapById(id))!
    await deleteSwap(id)
    expect(newSwap.id).toStrictEqual(id)
    expect(newSwap.offerId).toStrictEqual(offerId)
    expect(newSwap.txId).toStrictEqual('0xnew')
    expectDateNumberIsNow(newSwap.date)
    // reset the swaps count
    for (const swapsCount of initialSwapsCounts) {
      const snapshot = (await getCollectionSwapsCountSnapshotById(swapsCount.id))!
      const updatedSwapsCount = snapshot.data()
      expect(updatedSwapsCount.swapsCount).toBe(swapsCount.swapsCount + 1)
      await snapshot?.ref.update({ swapsCount: swapsCount.swapsCount })
    }
  })
})
