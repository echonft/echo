import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { listingTargetsIncludeOfferReceiverItems } from '@echo/model/helpers/listing/listing-targets-include-offer-receiver-items'
import { listingTargetsIncludeOfferSenderItems } from '@echo/model/helpers/listing/listing-targets-include-offer-sender-items'
import { type Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { unlessEmpty } from '@echo/utils/fp/unless-empty'
import { now } from '@echo/utils/helpers/now'
import {
  always,
  andThen,
  applySpec,
  converge,
  eqProps,
  filter,
  flatten,
  juxt,
  map,
  path,
  pipe,
  prop,
  uniqWith
} from 'ramda'

/**
 *  Get the offers for which the receiver items intersect with the listing items
 *  and for these offers, check if the sender items match with listing targets.
 *  If any offers are found, set the fulfill status
 * @param {Listing} listing
 * @returns {Promise<Omit<ListingOffer, "id">[]>}
 */
function receiverItemsMatch(listing: Listing): Promise<Omit<ListingOffer, 'id'>[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', '==', OFFER_STATE_OPEN),
    queryWhere('expiresAt', '>', now()),
    queryWhere('receiverItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), listing.items)),
    getQueryData,
    andThen(
      pipe(
        filter(listingTargetsIncludeOfferSenderItems(listing)),
        unlessEmpty(
          map(
            applySpec<Omit<ListingOffer, 'id'>>({
              listingId: always(listing.id),
              offerId: prop('id'),
              fulfillingStatus: converge(getListingOfferFulfillingStatus, [
                always(listing),
                prop('senderItems'),
                prop('receiverItems')
              ])
            })
          )
        )
      )
    )
  )()
}

/**
 *  Get the offers for which the sender items intersect with the listing items
 *  and for these offers, check if the receiver items match with listing targets.
 *  If any offers are found, set the fulfill status
 * @param {Listing} listing
 * @returns {Promise<Omit<ListingOffer, "id">[]>}
 */
function senderItemsMatch(listing: Listing): Promise<Omit<ListingOffer, 'id'>[]> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('state', '==', OFFER_STATE_OPEN),
    queryWhere('expiresAt', '>', now()),
    queryWhere('senderItemsNftIds', 'array-contains-any', map(path(['nft', 'id']), listing.items)),
    getQueryData,
    andThen(
      pipe(
        filter(listingTargetsIncludeOfferReceiverItems(listing)),
        unlessEmpty(
          map<Offer, Omit<ListingOffer, 'id'>>(
            applySpec<Omit<ListingOffer, 'id'>>({
              listingId: always(listing.id),
              offerId: prop('id'),
              fulfillingStatus: converge(getListingOfferFulfillingStatus, [
                always(listing),
                prop('receiverItems'),
                prop('senderItems')
              ])
            })
          )
        )
      )
    )
  )()
}

export function getListingOffersForListing(listing: Listing): Promise<Omit<ListingOffer, 'id'>[]> {
  return pipe<
    [Listing],
    Promise<Omit<ListingOffer, 'id'>[]>[],
    Promise<Omit<ListingOffer, 'id'>[][]>,
    Promise<Omit<ListingOffer, 'id'>[]>
  >(
    juxt([receiverItemsMatch, senderItemsMatch]),
    promiseAll,
    andThen(pipe(flatten, uniqWith(eqProps('offerId'))))
  )(listing)
}
