import { OfferError } from '@echo/firestore/constants/errors/offer/offer-error'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { updateOfferState, type UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { LISTING_STATE_FULFILLED, LISTING_STATE_PARTIALLY_FULFILLED } from '@echo/model/constants/listing-states'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, concat, filter, flatten, intersection, isNil, map, omit, pipe, prop, propEq, reject } from 'ramda'

export interface CompleteOfferArgs extends Omit<UpdateOfferStateArgs, 'state'> {
  transactionId: string
}

export async function completeOffer(args: CompleteOfferArgs): Promise<Offer> {
  const snapshot = await getOfferSnapshot(args.slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NOT_FOUND))
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
  await pipe<[CompleteOfferArgs], Omit<CompleteOfferArgs, 'reason'>, Swap, Promise<NewDocument<Swap>>>(
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
      if (fulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY) {
        await updateListingState(listingId, LISTING_STATE_FULFILLED)
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
        const listingItemIndexes = getNftIndexForNfts(listing.items)
        if (intersection(offerItemIndexes, listingItemIndexes).length === listingItemIndexes.length) {
          await updateListingState(listing.slug, LISTING_STATE_FULFILLED)
        } else {
          await updateListingState(listing.slug, LISTING_STATE_PARTIALLY_FULFILLED)
        }
      }
    }
  }
  return offer
}
