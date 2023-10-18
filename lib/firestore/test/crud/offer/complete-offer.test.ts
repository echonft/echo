import { findCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { findCollectionSwapsCountById } from '@echo/firestore/crud/collection-swaps-count/find-collection-swaps-count-by-id'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { deleteSwap } from '@echo/firestore/crud/swaps/delete-swap'
import { findSwapByOfferId } from '@echo/firestore/crud/swaps/find-swap-by-offer-id'
import { getOfferCollectionIds } from '@echo/model/helpers/offer/get-offer-collection-ids'
import { type OfferState } from '@echo/model/types/offer-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertCollectionSwapsCounts } from '@test-utils/collection-swaps-count/assert-collection-swaps-counts'
import { uncheckedUpdateCollectionSwapCounts } from '@test-utils/collection-swaps-count/unchecked-update-collection-swap-counts'
import { uncheckedUpdateListing } from '@test-utils/listing/unchecked-update-listing'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { assertSwaps } from '@test-utils/swap/assert-swaps'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { find, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - offer - completeOffer', () => {
  let initialState: OfferState
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
    await assertCollectionSwapsCounts()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const offer = (await findOfferById(offerId))!
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
    initialUpdatedAt = offer.updatedAt
  })
  afterEach(async () => {
    await uncheckedUpdateOffer(offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
  })

  it('throws if the offer is undefined', async () => {
    await expect(completeOffer('not-found', swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('throws if the offer is open', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(completeOffer(offerId, swapTransactionId)).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    const offer = (await findOfferById(offerId))!
    const listing = (await findListingById('jUzMtPGKM62mMhEcmbN4'))!
    const initialListingUpdatedAt = listing.updatedAt
    const initialListingState = listing.state
    const collectionIds = getOfferCollectionIds(offer)
    const initialSwapsCounts = await Promise.all(
      map(async (collectionId) => {
        return (await findCollectionSwapsCountByCollectionId(collectionId))!
      }, collectionIds)
    )
    await uncheckedUpdateOffer(offerId, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day').unix() })
    await completeOffer(offerId, swapTransactionId)
    const updatedOffer = (await findOfferById(offerId))!
    // reset the listing state
    const updatedListing = (await findListingById('jUzMtPGKM62mMhEcmbN4'))!
    await uncheckedUpdateListing(listing.id, { updatedAt: initialListingUpdatedAt, state: initialListingState })
    // delete the created swap
    const swap = (await findSwapByOfferId(offerId))!
    await deleteSwap(swap.id)
    // reset the swaps count
    const foundSwapsCounts = await Promise.all(map(pipe(prop('id'), findCollectionSwapsCountById), initialSwapsCounts))
    const updatedSwapsCounts = reject(isNil, foundSwapsCounts)
    for (const updatedSwapsCount of updatedSwapsCounts) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const initialSwapsCount: number = pipe(
        find(propEq(updatedSwapsCount.id, 'id')),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prop('swapsCount')
      )(initialSwapsCounts)
      await uncheckedUpdateCollectionSwapCounts(updatedSwapsCount.id, { swapsCount: initialSwapsCount })
    }
    // check updated offer
    expect(updatedOffer.state).toEqual('COMPLETED')
    expectDateNumberIsNow(updatedOffer.updatedAt)
    // check swap
    expect(swap.offerId).toStrictEqual(offerId)
    expect(swap.txId).toStrictEqual(swapTransactionId)
    expectDateNumberIsNow(swap.date)
    // check if the listing state was updated properly
    expect(updatedListing.state).toBe('PARTIALLY_FULFILLED')
    // check the swaps counts
    for (const updatedSwapsCount of updatedSwapsCounts) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const initialSwapsCount: number = pipe(
        find(propEq(updatedSwapsCount.id, 'id')),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prop('swapsCount')
      )(initialSwapsCounts)
      expect(updatedSwapsCount.swapsCount).toBe(initialSwapsCount + 1)
    }
  })
})
