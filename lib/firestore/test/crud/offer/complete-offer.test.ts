import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { completeOffer, type CompleteOfferArgs } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { findSwapByOfferId } from '@echo/firestore/crud/swap/find-swap-by-offer-id'
import { assertCollectionSwapsCounts } from '@echo/firestore-test/collection-swaps-count/assert-collection-swaps-counts'
import { findCollectionSwapsCountByCollectionId } from '@echo/firestore-test/collection-swaps-count/find-collection-swaps-count-by-collection-id'
import { findCollectionSwapsCountById } from '@echo/firestore-test/collection-swaps-count/find-collection-swaps-count-by-id'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore-test/collection-swaps-count/unchecked_update-collection-swap-counts'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { assertSwaps } from '@echo/firestore-test/swap/assert-swaps'
import { deleteSwap } from '@echo/firestore-test/swap/delete-swap'
import { LISTING_STATE_PARTIALLY_FULFILLED } from '@echo/model/constants/listing-states'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { getOfferCollectionIds } from '@echo/model/helpers/offer/get-offer-collection-ids'
import { type OfferState } from '@echo/model/types/offer-state'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, find, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - offer - completeOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  let createdStateUpdateId: Nullable<string>
  const pastDate = dayjs().subtract(1, 'day').unix()
  const futureDate = dayjs().add(1, 'day').unix()
  const args: CompleteOfferArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    transactionId: 'swap-transaction-id',
    updateArgs: {
      trigger: {
        by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM
      }
    }
  }
  beforeAll(async () => {
    await assertOffers()
    await assertSwaps()
    await assertCollectionSwapsCounts()
  })
  afterAll(async () => {
    await assertOffers()
    await assertSwaps()
    await assertCollectionSwapsCounts()
  })
  beforeEach(async () => {
    const offer = (await findOfferById(args.offerId))!
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
    initialUpdatedAt = offer.updatedAt
  })
  afterEach(async () => {
    await unchecked_updateOffer(args.offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
    if (!isNil(createdStateUpdateId)) {
      try {
        await deleteOfferUpdate(createdStateUpdateId)
      } catch (e) {
        logger.error(`Error deleting offer update with id ${createdStateUpdateId}: ${errorMessage(e)}`)
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), completeOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_OPEN, expiresAt: pastDate })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_CANCELLED, expiresAt: futureDate })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_COMPLETED, expiresAt: futureDate })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_REJECTED, expiresAt: futureDate })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is open', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_OPEN, expiresAt: futureDate })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the state update by trigger is not valid', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_OPEN, expiresAt: futureDate })
    await expect(
      pipe(
        assoc('updateArgs', {
          trigger: {
            by: 'not-system'
          }
        }),
        cancelOffer
      )(args)
    ).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    const offer = (await findOfferById(args.offerId))!
    const listing = (await findListingById('jUzMtPGKM62mMhEcmbN4'))!
    const initialListingUpdatedAt = listing.updatedAt
    const initialListingState = listing.state
    const collectionIds = getOfferCollectionIds(offer)
    const initialSwapsCounts = await Promise.all(
      map(async (collectionId) => {
        return (await findCollectionSwapsCountByCollectionId(collectionId))!
      }, collectionIds)
    )
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_ACCEPTED, expiresAt: futureDate })
    await completeOffer(args)
    const updatedOffer = (await findOfferById(args.offerId))!
    // reset the listing state
    const updatedListing = (await findListingById('jUzMtPGKM62mMhEcmbN4'))!
    await unchecked_updateListing(listing.id, { updatedAt: initialListingUpdatedAt, state: initialListingState })
    // delete the created swap
    const swap = (await findSwapByOfferId(args.offerId))!
    await deleteSwap(swap.id)
    // get offer state update
    const createdStateUpdate = (await findOfferStateUpdate(args.offerId, OFFER_STATE_COMPLETED))!
    createdStateUpdateId = createdStateUpdate.id
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
      await unchecked_updateCollectionSwapCounts(updatedSwapsCount.id, { swapsCount: initialSwapsCount })
    }
    // check the offer state update
    expect(createdStateUpdate).toBeDefined()
    // check updated offer
    expect(updatedOffer.state).toEqual(OFFER_STATE_COMPLETED)
    expectDateNumberIsNow(updatedOffer.updatedAt)
    // check swap
    expect(swap.offerId).toStrictEqual(args.offerId)
    expect(swap.transactionId).toStrictEqual(args.transactionId)
    expectDateNumberIsNow(swap.createdAt)
    // check if the listing state was updated properly
    expect(updatedListing.state).toBe(LISTING_STATE_PARTIALLY_FULFILLED)
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
