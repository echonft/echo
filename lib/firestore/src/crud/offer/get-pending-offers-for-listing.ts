import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { OFFER_STATES, READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import { getListingTargetsCollectionIds } from '@echo/model/helpers/listing/get-listing-targets-collection-ids'
import { getListingOfferFill } from '@echo/model/helpers/listing-offer/get-listing-offer-fill'
import type { Listing } from '@echo/model/types/listing'
import type { ListingOffer } from '@echo/model/types/listing-offer'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { isIn } from '@echo/utils/fp/is-in'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, assoc, converge, identity, juxt, map, pipe, propEq, reject } from 'ramda'

export function getPendingOffersForListing(listing: Listing, _state?: OfferState): Promise<ListingOffer[]> {
  // get pending offers for which sender items intersect listing targets and receiver items intersect listing items
  // then filter out the ones that don't fill the listing
  const listingItems = getListingItemsIds(listing)
  const listingTargets = getListingTargetsCollectionIds(listing)
  return pipe(
    getOffersCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhere('state', 'in', reject(isIn<OfferState>(READ_ONLY_OFFER_STATES), OFFER_STATES)),
    juxt([
      queryWhere('senderItemsNftCollectionIds', 'array-contains-any', listingTargets),
      queryWhere('receiverItemsNftIds', 'array-contains-any', listingItems)
    ]),
    getQueriesDocuments,
    andThen(
      pipe(
        map<Offer, ListingOffer>(
          pipe<[Offer], Offer & Record<'listing', Listing>, ListingOffer>(
            assoc('listing', listing),
            converge<
              ListingOffer,
              [
                (partial: Offer & Record<'listing', Listing>) => string,
                (partial: Offer & Record<'listing', Listing>) => ListingOfferFill,
                (partial: Offer & Record<'listing', Listing>) => Partial<ListingOffer>
              ]
            >(assoc, [always('fill'), getListingOfferFill(listing), identity])
          )
        ),
        reject(propEq(ListingOfferFill.NONE, 'fill'))
      )
    )
  )()
}
