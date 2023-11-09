import { findCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { addSwap, type AddSwapArgs } from '@echo/firestore/crud/swap/add-swap'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { getCollectionSwapsCountSnapshotById } from '@echo/firestore-test/collection-swaps-count/get-collection-swaps-count-snapshot-by-id'
import { assertSwaps } from '@echo/firestore-test/swap/assert-swaps'
import { deleteSwap } from '@echo/firestore-test/swap/delete-swap'
import { findSwapById } from '@echo/firestore-test/swap/find-swap-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getOfferCollectionIds } from '@echo/model/helpers/offer/get-offer-collection-ids'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assoc, map, pipe } from 'ramda'

describe('CRUD - swap - addSwap', () => {
  const args: AddSwapArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    transactionId: '0xnew'
  }
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertSwaps()
    await assertCollectionSwapsCounts()
    await tearDownRemoteFirestoreTests()
  })
  it('throws if trying to add a swap for an offer that does not exist', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), addSwap)(args)).rejects.toBeDefined()
  })
  it('throws if trying to add a swap for an offer that already has a swap', async () => {
    await expect(pipe(assoc('offerId', 'ASkFpKoHEHVH0gd69t1G'), addSwap)(args)).rejects.toBeDefined()
  })
  it('add a swap', async () => {
    const offer = getOfferMockById(args.offerId)
    const collectionIds = getOfferCollectionIds(offer)
    const initialSwapsCounts = await Promise.all(
      map(async (collectionId) => {
        return (await findCollectionSwapsCountByCollectionId(collectionId))!
      }, collectionIds)
    )
    const { id } = await addSwap(args)
    const newSwap = (await findSwapById(id))!
    await deleteSwap(id)
    expect(newSwap.id).toStrictEqual(id)
    expect(newSwap.offerId).toStrictEqual(args.offerId)
    expect(newSwap.transactionId).toStrictEqual(args.transactionId)
    expectDateNumberIsNow(newSwap.createdAt)
    // reset the swaps count
    for (const swapsCount of initialSwapsCounts) {
      const snapshot = (await getCollectionSwapsCountSnapshotById(swapsCount.id))!
      const updatedSwapsCount = snapshot.data()
      expect(updatedSwapsCount.swapsCount).toBe(swapsCount.swapsCount + 1)
      await snapshot?.ref.update({ swapsCount: swapsCount.swapsCount })
    }
  })
})
