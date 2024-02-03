import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { updateListingState } from '@echo/firestore/crud/listing/update-listing-state'
import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOffersForListing } from '@echo/firestore/crud/listing-offer/get-listing-offers-for-listing'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateOfferState } from '@echo/firestore/crud/offer/update-offer-state'
import { addSwap, type AddSwapArgs } from '@echo/firestore/crud/swap/add-swap'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import { LISTING_STATE_FULFILLED, LISTING_STATE_PARTIALLY_FULFILLED } from '@echo/model/constants/listing-states'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { getItemId } from '@echo/model/helpers/item/get-item-id'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { type Offer } from '@echo/model/types/offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import type { OfferState } from '@echo/model/types/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, concat, filter, flatten, intersection, isNil, map, omit, pipe, prop, propEq, reject, uniq } from 'ramda'

export interface CompleteOfferArgs {
  offerId: string
  transactionId: string
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export async function completeOffer(args: CompleteOfferArgs): Promise<Offer> {
  const offer = await pipe<
    [CompleteOfferArgs],
    Omit<CompleteOfferArgs, 'transactionId'>,
    Omit<CompleteOfferArgs, 'transactionId'> & Record<'state', OfferState>,
    Promise<Offer>
  >(
    omit(['swapTransactionId']),
    assoc('state', OFFER_STATE_COMPLETED),
    updateOfferState
  )(args)
  // add swap
  await pipe<[CompleteOfferArgs], AddSwapArgs, Promise<Swap>>(omit(['updateArgs']), addSwap)(args)
  // update the status of tied listings, if any
  const offerListingOffers = await getListingOffersByOfferId(args.offerId)
  for (const offerListingOffer of offerListingOffers) {
    const { listingId, fulfillingStatus } = offerListingOffer
    const listing = await findListingById(listingId)
    if (!isNil(listing) && !listing.readOnly) {
      if (fulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY) {
        await updateListingState(listingId, LISTING_STATE_FULFILLED)
      } else {
        // in this case, we need to check all the completed offers linked to this listing, and check if this one partially of completely fulfills it
        const offer = (await findOfferById(args.offerId))!
        const offerItems = getOfferItems(offer)
        const listingListingOffers = await getListingOffersForListing(listing)
        const listingOffers = await Promise.all(map(pipe(prop('offerId'), findOfferById), listingListingOffers))
        const completedOffersItems: OfferItem[] = pipe<
          [Nullable<Offer>[]],
          Offer[],
          Offer[],
          OfferItem[][],
          OfferItem[]
        >(
          reject(isNil),
          filter(propEq<OfferState, 'state'>(OFFER_STATE_COMPLETED, 'state')),
          map(getOfferItems),
          flatten
        )(listingOffers)
        const offerItemIds = pipe(concat, map(getItemId), uniq<string>)(offerItems, completedOffersItems)
        const listingItemIds = getListingItemsIds(listing)
        if (intersection(offerItemIds, listingItemIds).length === listingItemIds.length) {
          await updateListingState(listingId, LISTING_STATE_FULFILLED)
        } else {
          await updateListingState(listingId, LISTING_STATE_PARTIALLY_FULFILLED)
        }
      }
    }
  }
  return offer
}
