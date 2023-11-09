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
import { getItemId } from '@echo/model/helpers/item/get-item-id'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { type Offer } from '@echo/model/types/offer'
import { type OfferItem } from '@echo/model/types/offer-item'
import type { OfferState } from '@echo/model/types/offer-state'
import { assoc, concat, filter, flatten, intersection, isNil, map, omit, pipe, prop, propEq, reject, uniq } from 'ramda'

export interface CompleteOfferArgs {
  offerId: string
  transactionId: string
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}
export async function completeOffer(args: CompleteOfferArgs) {
  const offer = await pipe<
    [CompleteOfferArgs],
    Omit<CompleteOfferArgs, 'transactionId'>,
    Omit<CompleteOfferArgs, 'transactionId'> & Record<'state', OfferState>,
    Promise<Offer>
  >(
    omit(['swapTransactionId']),
    assoc('state', 'COMPLETED'),
    updateOfferState
  )(args)
  // add swap
  await pipe<[CompleteOfferArgs], AddSwapArgs, Promise<Swap>>(omit(['updateArgs']), addSwap)(args)
  // update the status of tied listings, if any
  const offerListingOffers = await getListingOffersByOfferId(args.offerId)
  for (const offerListingOffer of offerListingOffers) {
    const { listingId, fulfillingStatus } = offerListingOffer
    const listing = await findListingById(listingId)
    if (!isNil(listing) && !listing.expired && listing.state !== 'FULFILLED' && listing.state !== 'CANCELLED') {
      if (fulfillingStatus === ListingOfferFulfillingStatus.COMPLETELY) {
        await updateListingState(listingId, 'FULFILLED')
      } else {
        // in this case, we need to check all the completed offers linked to this listing, and check if this one partially of completely fulfills it
        const offer = (await findOfferById(args.offerId))!
        const offerItems = getOfferItems(offer)
        const listingListingOffers = await getListingOffersForListing(listing)
        const listingOffers = await Promise.all(map(pipe(prop('offerId'), findOfferById), listingListingOffers))
        const completedOffersItems: OfferItem[] = pipe<
          [(Offer | undefined)[]],
          Offer[],
          Offer[],
          OfferItem[][],
          OfferItem[]
        >(
          reject(isNil),
          filter(propEq('COMPLETED', 'state')),
          map(getOfferItems),
          flatten
        )(listingOffers)
        const offerItemIds = pipe(concat, map(getItemId), uniq<string>)(offerItems, completedOffersItems)
        const listingItemIds = getListingItemsIds(listing)
        if (intersection(offerItemIds, listingItemIds).length === listingItemIds.length) {
          await updateListingState(listingId, 'FULFILLED')
        } else {
          await updateListingState(listingId, 'PARTIALLY_FULFILLED')
        }
      }
    }
  }
  return offer
}
