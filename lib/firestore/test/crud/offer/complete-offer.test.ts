import { assertCollectionSwapsCounts } from '@echo/firestore/utils/collection-swaps-count/assert-collection-swaps-counts'
import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { unchecked_updateListing } from '@echo/firestore/utils/listing/unchecked_update-listing'
import { assertNfts } from '@echo/firestore/utils/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore/utils/nft/unchecked_update-nft'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { assertOffers } from '@echo/firestore/utils/offer/assert-offers'
import { unchecked_updateOffer } from '@echo/firestore/utils/offer/unchecked_update-offer'
import { assertSwaps } from '@echo/firestore/utils/swap/assert-swaps'
import { deleteSwap } from '@echo/firestore/crud/swap/delete-swap'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { completeOffer, type CompleteOfferArgs } from '@echo/firestore/crud/offer/complete-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { getSwapSnapshot } from '@echo/firestore/crud/swap/get-swap'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockByIndex } from '@echo/model/mocks/nft/get-nft-mock-by-index'
import { getOfferMockBySlug } from '@echo/model/mocks/offer/get-offer-mock-by-slug'
import { offerMockToJohnnycageId, offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
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
import type { NftIndex } from '@echo/model/types/nft-index'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { futureDate } from '@echo/utils/helpers/future-date'
import { pastDate } from '@echo/utils/helpers/past-date'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
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
    transactionId: 'swap-transaction-id',
    updateArgs: {
      trigger: {
        by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM
      }
    }
  }
  beforeAll(async () => {
    await assertNfts()
    await assertOffers()
    await assertSwaps()
    await assertCollectionSwapsCounts()
  })
  afterAll(async () => {
    await assertNfts()
    await assertOffers()
    await assertSwaps()
    await assertCollectionSwapsCounts()
  })
  beforeEach(() => {
    createdStateUpdateId = undefined
    createdSwapId = undefined
    initialSwapsCounts = []
    updatedNftIndexes = []
  })
  afterEach(async () => {
    try {
      await unchecked_updateOffer(slug, getOfferMockBySlug(slug))
    } catch (e) {
      throw Error(`error updating offer with slug ${slug} to its original state: ${errorMessage(e)}`)
    }
    try {
      await unchecked_updateListing(listingId, getListingMockById(listingId))
    } catch (e) {
      throw Error(`error updating listing ${listingId} to its original state: ${errorMessage(e)}`)
    }
    if (!isNil(createdStateUpdateId)) {
      try {
        await deleteOfferUpdate(createdStateUpdateId)
      } catch (e) {
        pinoLogger.error(`Error deleting offer update with id ${createdStateUpdateId}: ${errorMessage(e)}`)
      }
    }
    if (!isNil(createdSwapId)) {
      try {
        await deleteSwap(createdSwapId)
      } catch (e) {
        pinoLogger.error(`Error deleting swap with id ${createdSwapId}: ${errorMessage(e)}`)
      }
      // reset the NFTs with their original data
      if (!isEmpty(updatedNftIndexes)) {
        for (const index of updatedNftIndexes) {
          try {
            await unchecked_updateNft(index, getNftMockByIndex(index))
          } catch (e) {
            pinoLogger.error(`Error resetting nft with index ${JSON.stringify(index)}: ${errorMessage(e)}`)
          }
        }
      }
    }
    if (!isEmpty(initialSwapsCounts)) {
      for (const swapsCount of initialSwapsCounts) {
        try {
          await unchecked_updateCollectionSwapCounts(swapsCount.collectionId, { swapsCount: swapsCount.swapsCount })
        } catch (e) {
          pinoLogger.error(
            `Error resetting swaps count for collection with id ${swapsCount.collectionId}: ${errorMessage(e)}`
          )
        }
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('slug', 'not-found'), completeOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_EXPIRED, expiresAt: pastDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_CANCELLED, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_COMPLETED, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_REJECTED, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is open', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_OPEN, expiresAt: futureDate() })
    await expect(completeOffer(args)).rejects.toBeDefined()
  })
  it('throws if the state update by trigger is not valid', async () => {
    await unchecked_updateOffer(slug, { state: OFFER_STATE_OPEN, expiresAt: futureDate() })
    await expect(
      pipe(
        assoc('updateArgs', {
          trigger: {
            by: 'not-system'
          }
        }),
        completeOffer
      )(args)
    ).rejects.toBeDefined()
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
    await unchecked_updateOffer(slug, { state: OFFER_STATE_ACCEPTED, expiresAt: futureDate() })
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
    expect(dayjs.unix(updatedOffer.updatedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(updatedOffer.updatedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
    // check swap
    expect(swap.offerId).toStrictEqual(offerId)
    expect(swap.transactionId).toStrictEqual(args.transactionId)
    expect(dayjs.unix(swap.createdAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(swap.createdAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
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
