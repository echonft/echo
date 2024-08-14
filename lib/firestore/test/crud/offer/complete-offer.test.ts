import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { completeOffer, type CompleteOfferArgs } from '@echo/firestore/crud/offer/complete-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { deleteSwap } from '@echo/firestore/crud/swap/delete-swap'
import { getSwapSnapshot } from '@echo/firestore/crud/swap/get-swap'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { resetListings } from '@echo/firestore/utils/listing/reset-listings'
import { resetNft } from '@echo/firestore/utils/nft/reset-nft'
import { resetOffers } from '@echo/firestore/utils/offer/reset-offers'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { LISTING_STATE_PARTIALLY_FULFILLED } from '@echo/model/constants/listing-states'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { getOfferItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-items-collection-slugs'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { offerMockToJohnnycageId, offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import type { NftIndex } from '@echo/model/types/nft'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { futureDate } from '@echo/utils/helpers/future-date'
import { pastDate } from '@echo/utils/helpers/past-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, assoc, find, isEmpty, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - offer - completeOffer', () => {
  const listingId = listingMockId()
  const offerId = offerMockToJohnnycageId()
  const slug = offerMockToJohnnycageSlug()
  let initialSwapsCounts: CollectionSwapsCount[]
  let createdStateUpdateId: Nullable<string>
  let createdSwapId: Nullable<string>
  let updatedNftIndexes: NftIndex[]
  const args: CompleteOfferArgs = {
    slug,
    transactionId: 'swap-transaction-id'
  }
  // beforeAll(async () => {
  //   await assertNfts()
  //   await assertOffers()
  //   await assertSwaps()
  //   await assertCollectionSwapsCounts()
  // })
  // afterAll(async () => {
  //   await assertNfts()
  //   await assertOffers()
  //   await assertSwaps()
  //   await assertCollectionSwapsCounts()
  // })
  beforeEach(() => {
    createdStateUpdateId = undefined
    createdSwapId = undefined
    initialSwapsCounts = []
    updatedNftIndexes = []
  })
  afterEach(async () => {
    await resetOffers()
    await resetListings()
    if (!isNil(createdStateUpdateId)) {
      await deleteOfferUpdate(createdStateUpdateId)
    }
    if (!isNil(createdSwapId)) {
      await deleteSwap(createdSwapId)
      // reset the NFTs with their original data
      if (!isEmpty(updatedNftIndexes)) {
        for (const index of updatedNftIndexes) {
          await resetNft(index)
        }
      }
    }
    if (!isEmpty(initialSwapsCounts)) {
      for (const swapsCount of initialSwapsCounts) {
        await unchecked_updateCollectionSwapCounts(swapsCount.collectionId, { swapsCount: swapsCount.swapsCount })
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('slug', 'not-found'), completeOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(slug, { state: OFFER_STATE_EXPIRED, expiresAt: pastDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(slug, { state: OFFER_STATE_CANCELLED, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(slug, { state: OFFER_STATE_COMPLETED, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(slug, { state: OFFER_STATE_REJECTED, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is open', async () => {
    await updateOffer(slug, { state: OFFER_STATE_OPEN, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    const offer = (await getOffer(slug))!
    expect(offer).toBeDefined()
    initialSwapsCounts = await pipe(
      getOfferItemsCollectionSlugs,
      map(getCollectionSwapsCountByCollectionSlug),
      promiseAll,
      andThen<Nullable<CollectionSwapsCount>[], CollectionSwapsCount[]>(reject(isNil))
    )(offer)
    expect(initialSwapsCounts).toBeDefined()
    expect(initialSwapsCounts.length).toBe(2)
    await updateOffer(slug, { state: OFFER_STATE_ACCEPTED, expiresAt: futureDate() })
    await completeOffer(args)
    const updatedOffer = (await getOffer(slug))!
    updatedNftIndexes = pipe(getOfferItems, getNftIndexForNfts)(updatedOffer)
    const updatedListing = (await getListingById(listingId))!
    const swapSnapshot = (await getSwapSnapshot(slug))!
    createdSwapId = swapSnapshot.id
    const swap = swapSnapshot.data()
    // get offer state update
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId,
      state: OFFER_STATE_COMPLETED
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    const updatedSwapsCounts = await pipe(
      map(pipe(prop('collectionId'), getCollectionSwapsCountByCollectionId)),
      promiseAll,
      andThen<Nullable<CollectionSwapsCount>[], CollectionSwapsCount[]>(reject(isNil))
    )(initialSwapsCounts)
    // check the offer state update
    expect(stateUpdateSnapshot).toBeDefined()
    // check updated offer
    expect(updatedOffer.state).toEqual(OFFER_STATE_COMPLETED)
    // check swap
    expect(swap.offerId).toStrictEqual(offerId)
    expect(swap.transactionId).toStrictEqual(args.transactionId)
    // check if the listing state was updated properly
    expect(updatedListing.state).toBe(LISTING_STATE_PARTIALLY_FULFILLED)
    // check the swaps counts
    expect(updatedSwapsCounts.length).toEqual(initialSwapsCounts.length)
    for (const updatedSwapsCount of updatedSwapsCounts) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const initialSwapsCount: number = pipe(
        find(propEq(updatedSwapsCount.collectionId, 'collectionId')),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prop('swapsCount')
      )(initialSwapsCounts)
      expect(updatedSwapsCount.swapsCount).toBe(initialSwapsCount + 1)
    }
  })
})
