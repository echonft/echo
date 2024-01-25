import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getListingOfferFulfillingStatus } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { LISTING_STATES, READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { offerItemsIncludeListingTargets } from '@echo/model/helpers/offer/offer-items-include-listing-targets'
import type { ListingState } from '@echo/model/types/listing-state'
import { type Offer } from '@echo/model/types/offer'
import { isIn } from '@echo/utils/fp/is-in'
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
  identity,
  juxt,
  map,
  path,
  pipe,
  prop,
  reject,
  uniqWith
} from 'ramda'

/**
 * Get the listings for which the items intersect with receiver items
 * for these listings, check if the targets match with the sender items
 * if any listings are found, set the fulfill status
 * @param {Offer} offer
 * @returns {Promise<Omit<ListingOffer, "id">[]>}
 */
function receiverItemsListingItemsMatch(offer: Offer): Promise<Omit<ListingOffer, 'id'>[]> {
  const { senderItems, receiverItems } = offer
  return pipe(
    getListingsCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', reject(isIn<ListingState>(READ_ONLY_LISTING_STATES), LISTING_STATES)),
    queryWhere('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), receiverItems)),
    getQueryData,
    andThen(
      pipe(
        filter(offerItemsIncludeListingTargets(senderItems)),
        unlessEmpty(
          map(
            applySpec<Omit<ListingOffer, 'id'>>({
              listingId: prop('id'),
              offerId: always(offer.id),
              fulfillingStatus: converge(getListingOfferFulfillingStatus, [
                identity,
                always(senderItems),
                always(receiverItems)
              ])
            })
          )
        )
      )
    )
  )()
}

/**
 * Get the listings for which the items intersect with sender items
 * for these listings, check if the targets match with the receiver items
 * if any listings are found, set the fulfill status
 * @param {Offer} offer
 * @returns {Promise<Omit<ListingOffer, "id">[]>}
 */
function senderItemsListingItemsMatch(offer: Offer): Promise<Omit<ListingOffer, 'id'>[]> {
  const { senderItems, receiverItems } = offer
  return pipe(
    getListingsCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', reject(isIn<ListingState>(READ_ONLY_LISTING_STATES), LISTING_STATES)),
    queryWhere('itemsNftIds', 'array-contains-any', map(path(['nft', 'id']), senderItems)),
    getQueryData,
    andThen(
      pipe(
        filter(offerItemsIncludeListingTargets(receiverItems)),
        unlessEmpty(
          map(
            applySpec<Omit<ListingOffer, 'id'>>({
              listingId: prop('id'),
              offerId: always(offer.id),
              fulfillingStatus: converge(getListingOfferFulfillingStatus, [
                identity,
                always(receiverItems),
                always(senderItems)
              ])
            })
          )
        )
      )
    )
  )()
}

export async function getListingOffersForOffer(offer: Offer): Promise<Omit<ListingOffer, 'id'>[]> {
  return pipe<
    [Offer],
    Promise<Omit<ListingOffer, 'id'>[]>[],
    Promise<Omit<ListingOffer, 'id'>[][]>,
    Promise<Omit<ListingOffer, 'id'>[]>
  >(
    juxt([receiverItemsListingItemsMatch, senderItemsListingItemsMatch]),
    promiseAll,
    andThen(pipe(flatten, uniqWith(eqProps('offerId'))))
  )(offer)
}
