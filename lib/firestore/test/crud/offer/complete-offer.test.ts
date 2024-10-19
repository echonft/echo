import { getCollectionSwapsCountByCollectionId } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import { getCollectionSwapsCountByCollectionSlug } from '@echo/firestore/crud/collection-swaps-count/get-collection-swaps-count-by-collection-slug'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { deleteOfferUpdate } from '@echo/firestore/crud/offer-update/delete-offer-update'
import { getOfferStateUpdateSnapshot } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { completeOffer, type CompleteOfferArgs } from '@echo/firestore/crud/offer/complete-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { deleteSwap } from '@echo/firestore/crud/swap/delete-swap'
import { getSwapSnapshot } from '@echo/firestore/crud/swap/get-swap'
import type { CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count-document-data'
import { unchecked_updateCollectionSwapCounts } from '@echo/firestore/utils/collection-swaps-count/unchecked_update-collection-swap-counts'
import { resetListing } from '@echo/firestore/utils/listing/reset-listing'
import { resetNft } from '@echo/firestore/utils/nft/reset-nft'
import { resetOffer } from '@echo/firestore/utils/offer/reset-offer'
import { updateOffer } from '@echo/firestore/utils/offer/update-offer'
import { ListingState } from '@echo/model/constants/listing-state'
import { OfferState } from '@echo/model/constants/offer-state'
import { nftItemsIndex } from '@echo/model/helpers/item/nft-items-index'
import { offerItemsCollectionSlug } from '@echo/model/helpers/offer/offer-items-collection-slug'
import { offerNftItems } from '@echo/model/helpers/offer/offer-nft-items'
import { listingMockId, listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { offerMockToJohnnycageId, offerMockToJohnnycageSlug } from '@echo/model/mocks/offer/offer-mock'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Slug } from '@echo/model/types/slug'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { futureDate } from '@echo/utils/helpers/future-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { andThen, assoc, find, isEmpty, isNil, map, pipe, prop, propEq, reject } from 'ramda'

describe('CRUD - offer - completeOffer', () => {
  let listingSlug: Nullable<Slug>
  const offerId = offerMockToJohnnycageId()
  const slug = offerMockToJohnnycageSlug()
  let initialSwapsCounts: CollectionSwapsCountDocumentData[]
  let createdStateUpdateId: Nullable<string>
  let createdSwapId: Nullable<string>
  let updatedNftIndexes: NftIndex[]
  const args: CompleteOfferArgs = {
    slug,
    transactionId: 'swap-transaction-id'
  }

  beforeEach(() => {
    createdStateUpdateId = undefined
    createdSwapId = undefined
    initialSwapsCounts = []
    listingSlug = undefined
    updatedNftIndexes = []
  })
  afterEach(async () => {
    await resetOffer(slug)
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
    if (!isNil(listingSlug)) {
      await resetListing(listingSlug)
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('slug', 'not-found'), completeOffer)(args)).rejects.toBeDefined()
  })
  it('complete offer', async () => {
    const offer = (await getOffer(slug))!
    expect(offer).toBeDefined()
    initialSwapsCounts = await pipe(
      offerItemsCollectionSlug,
      map(getCollectionSwapsCountByCollectionSlug),
      promiseAll,
      andThen<Nullable<CollectionSwapsCountDocumentData>[], CollectionSwapsCountDocumentData[]>(reject(isNil))
    )(offer)
    expect(initialSwapsCounts).toBeDefined()
    expect(initialSwapsCounts.length).toBe(2)
    await updateOffer(slug, { state: OfferState.Accepted, expiresAt: futureDate() })
    await completeOffer(args)
    listingSlug = listingMockSlug()
    const updatedOffer = (await getOffer(slug))!
    updatedNftIndexes = pipe(offerNftItems, nftItemsIndex)(updatedOffer)
    const updatedListing = (await getListingById(listingMockId()))!
    const swapSnapshot = (await getSwapSnapshot(slug))!
    createdSwapId = swapSnapshot.id
    const swap = swapSnapshot.data()
    // get offer state update
    const stateUpdateSnapshot = (await getOfferStateUpdateSnapshot({
      offerId,
      state: OfferState.Completed
    }))!
    createdStateUpdateId = stateUpdateSnapshot.id
    const updatedSwapsCounts = await pipe(
      map(pipe(prop('collectionId'), getCollectionSwapsCountByCollectionId)),
      promiseAll,
      andThen<Nullable<CollectionSwapsCountDocumentData>[], CollectionSwapsCountDocumentData[]>(reject(isNil))
    )(initialSwapsCounts)
    // check the offer state update
    expect(stateUpdateSnapshot).toBeDefined()
    // check updated offer
    expect(updatedOffer.state).toEqual(OfferState.Completed)
    // check swap
    expect(swap.offerId).toStrictEqual(offerId)
    expect(swap.transactionId).toStrictEqual(args.transactionId)
    // check if the listing state was updated properly
    expect(updatedListing.state).toBe(ListingState.PartiallyFulfilled)
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
