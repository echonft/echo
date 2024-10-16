import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { eqListingOffers } from '@echo/firestore/helpers/listing-offer/eq-listing-offers'
import { getListingOfferFulfillingStatusForOffer } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-offer'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Listing } from '@echo/model/types/listing/listing'
import { listingItemsIndexes } from '@echo/model/types/listing/listing-items-indexes'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, applySpec, invoker, isNil, juxt, map, pipe, prop, propEq, reject, uniqWith } from 'ramda'

export async function getListingOffersForListing(listing: Listing): Promise<ListingOfferDocumentData[]> {
  const listingSnapshot = await getListingSnapshot(listing.slug)
  if (isNil(listingSnapshot)) {
    return Promise.reject(Error(`listing with slug ${listing.slug} does not exist`))
  }
  // get pending offers for which sender items contain the listing targets and receiver items intersect listing items
  // then filter out the ones that don't fill the listing
  const listingItemIndexes = listingItemsIndexes(listing)
  return pipe(
    getOffersCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    juxt([
      queryWhere('senderItemCollections', 'array-contains', listing.target.collection.slug),
      queryWhere('receiverItemIndexes', 'array-contains-any', listingItemIndexes)
    ]),
    getQueriesSnapshots,
    andThen(
      pipe(
        map(
          applySpec<ListingOfferDocumentData>({
            listingId: always(listingSnapshot.id),
            offerId: prop('id'),
            fulfillingStatus: pipe(invoker(0, 'data'), getListingOfferFulfillingStatusForOffer(listing))
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.None, 'fulfillingStatus')),
        uniqWith(eqListingOffers)
      )
    )
  )()
}
