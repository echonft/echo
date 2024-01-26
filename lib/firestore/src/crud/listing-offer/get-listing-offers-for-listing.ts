import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getListingOfferFulfillingStatusForOffer } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-offer'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { getListingItemsIds } from '@echo/model/helpers/listing/get-listing-items-ids'
import { getListingTargetsCollectionIds } from '@echo/model/helpers/listing/get-listing-targets-collection-ids'
import { type Listing } from '@echo/model/types/listing'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, applySpec, juxt, map, pipe, prop, propEq, reject } from 'ramda'

export function getListingOffersForListing(listing: Listing): Promise<Omit<ListingOffer, 'id'>[]> {
  // get pending offers for which sender items intersect listing targets and receiver items intersect listing items
  // then filter out the ones that don't fill the listing
  const listingItems = getListingItemsIds(listing)
  const listingTargets = getListingTargetsCollectionIds(listing)
  return pipe(
    getOffersCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    juxt([
      queryWhere('senderItemsNftCollectionIds', 'array-contains-any', listingTargets),
      queryWhere('receiverItemsNftIds', 'array-contains-any', listingItems)
    ]),
    getQueriesDocuments,
    andThen(
      pipe(
        map(
          applySpec<Omit<ListingOffer, 'id'>>({
            listingId: always(listing.id),
            offerId: prop('id'),
            fulfillingStatus: getListingOfferFulfillingStatusForOffer(listing)
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.NONE, 'fulfillingStatus'))
      )
    )
  )()
}
