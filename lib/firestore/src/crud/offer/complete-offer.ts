import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { updateOfferState, type UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { ListingState } from '@echo/model/constants/listing-state'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { listingItemsIndexes } from '@echo/model/helpers/listing/listing-items-indexes'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Nft } from '@echo/model/types/nft/nft'
import { type Offer } from '@echo/model/types/offer/offer'
import type { OfferState } from '@echo/model/types/offer/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, concat, filter, flatten, intersection, isNil, map, omit, pipe, prop, propEq, reject } from 'ramda'

export interface CompleteOfferArgs extends Omit<UpdateOfferStateArgs, 'state'> {
  transactionId: string
}

export async function completeOffer(args: CompleteOfferArgs): Promise<Offer> {
  const snapshot = await getOfferSnapshot(args.slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offer = await pipe<
    [CompleteOfferArgs],
    Omit<CompleteOfferArgs, 'transactionId'>,
    UpdateOfferStateArgs,
    Promise<Offer>
  >(
    omit(['transactionId']),
    assoc<OfferState, 'state'>('state', OFFER_STATE_COMPLETED),
    updateOfferState
  )(args)
  // add swap
  await pipe<
    [CompleteOfferArgs],
    Omit<CompleteOfferArgs, 'reason'>,
    SwapDocumentData,
    Promise<NewDocument<SwapDocumentData>>
  >(
    omit(['reason']),
    assoc('offerId', snapshot.id),
    addSwap
  )(args)
  // update the status of tied listings, if any
  const offerListingOffers = await getListingOffersByOfferId(snapshot.id)
  for (const offerListingOffer of offerListingOffers) {
    const { listingId, fulfillingStatus } = offerListingOffer
    const listing = await getListingById(listingId)
    if (!isNil(listing) && !listing.readOnly) {
      if (fulfillingStatus === ListingOfferFulfillingStatus.Completely) {
        await updateListingState(listing.slug, ListingState.Fulfilled)
      } else {
        // in this case, we need to check all the completed offers linked to this listing, and check if this one partially of completely fulfills it
        const offerItems = getOfferItems(offer)
        const listingListingOffers = await getListingOffersForListing(listing)
        const listingOffers = await Promise.all(map(pipe(prop('offerId'), getOfferById), listingListingOffers))
        const completedOffersItems = pipe<[Nullable<Offer>[]], Offer[], Offer[], Nft[][], Nft[]>(
          reject(isNil),
          filter(propEq<OfferState, 'state'>(OFFER_STATE_COMPLETED, 'state')),
          map(getOfferItems),
          flatten
        )(listingOffers)
        const offerItemIndexes = pipe(concat, getNftIndexForNfts)(offerItems, completedOffersItems)
        const listingItemIndexes = listingItemsIndexes(listing)
        if (intersection(offerItemIndexes, listingItemIndexes).length === listingItemIndexes.length) {
          await updateListingState(listing.slug, ListingState.Fulfilled)
        } else {
          await updateListingState(listing.slug, ListingState.PartiallyFulfilled)
        }
      }
    }
  }
  return offer
}
