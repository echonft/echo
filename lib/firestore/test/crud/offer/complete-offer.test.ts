import { findNftCollectionSwapsCountByNftCollectionId } from '@echo/firestore/crud/nft-collection-swaps-count/find-nft-collection-swaps-count-by-nft-collection-id'
import { getNftCollectionSwapsCountSnapshotById } from '@echo/firestore/crud/nft-collection-swaps-count/get-nft-collection-swaps-count-snapshot-by-id'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import { deleteSwap } from '@echo/firestore/crud/swaps/delete-swap'
import { findSwapByOfferId } from '@echo/firestore/crud/swaps/find-swap-by-offer-id'
import { getOfferCollectionIds } from '@echo/firestore/helpers/offer/get-offer-collection-ids'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertNftCollectionSwapsCounts } from '@test-utils/nft-collection-swaps-count/assert-nft-collection-swaps-counts'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { map } from 'ramda'

describe('CRUD - offer - completeOffer', () => {
  let initialState: FirestoreOfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const swapTransactionId = 'swap-transaction-id'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOffers()
    await assertSwaps()
    await assertNftCollectionSwapsCounts()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const offer = (await findOfferById(offerId))!
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
    initialUpdatedAt = offer.updatedAt
  })
  afterEach(async () => {
    await updateOffer(offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
  })

  it('throws if the offer is undefined', async () => {
    await expect(completeOffer('not-found', swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await updateOffer(offerId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is open', async () => {
    await updateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    const offer = (await findOfferById(offerId))!
    const collectionIds = getOfferCollectionIds(offer)
    const initialSwapsCounts = await Promise.all(
      map(async (collectionId) => {
        return (await findNftCollectionSwapsCountByNftCollectionId(collectionId))!
      }, collectionIds)
    )
    await updateOffer(offerId, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day').unix() })
    await completeOffer(offerId, swapTransactionId)
    const updatedOffer = (await findOfferById(offerId))!
    expect(updatedOffer.state).toEqual('COMPLETED')
    expectDateNumberIsNow(updatedOffer.updatedAt)
    // make sure that swap was added
    const swap = (await findSwapByOfferId(offerId))!
    await deleteSwap(swap.id)
    expect(swap.offerId).toStrictEqual(offerId)
    expect(swap.txId).toStrictEqual(swapTransactionId)
    expectDateNumberIsNow(swap.date)
    // reset the swaps count
    for (const swapsCount of initialSwapsCounts) {
      const snapshot = (await getNftCollectionSwapsCountSnapshotById(swapsCount.id))!
      const updatedSwapsCount = snapshot.data()
      expect(updatedSwapsCount.swapsCount).toBe(swapsCount.swapsCount + 1)
      await snapshot?.ref.update({ swapsCount: swapsCount.swapsCount })
    }
  })
})
