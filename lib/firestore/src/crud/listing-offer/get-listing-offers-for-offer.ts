import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { eqListingOffers } from '@echo/firestore/helpers/listing-offer/eq-listing-offers'
import { getListingOfferFulfillingStatusForListing } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-listing'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { NOT_READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { getOfferReceiverItemsIndexes } from '@echo/model/helpers/offer/get-offer-receiver-items-indexes'
import { getOfferSenderItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-sender-items-collection-slugs'
import { type Offer } from '@echo/model/types/offer/offer'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, applySpec, invoker, isNil, juxt, map, pipe, prop, propEq, reject, uniqWith } from 'ramda'

export async function getListingOffersForOffer(offer: Offer): Promise<ListingOfferDocumentData[]> {
  const offerSnapshot = await getOfferSnapshot(offer.slug)
  if (isNil(offerSnapshot)) {
    return Promise.reject(Error(`offer with slug ${offer.slug} does not exist`))
  }
  // get pending listings for which targets intersect the offer sender items and items intersect the offer receiver items
  // then filter out the ones for which the offer does not fill the listing
  return pipe(
    getListingsCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
    juxt([
      queryWhere('target.collection.slug', 'in', getOfferSenderItemsCollectionSlugs(offer)),
      queryWhere('itemIndexes', 'array-contains-any', getOfferReceiverItemsIndexes(offer))
    ]),
    getQueriesSnapshots,
    andThen(
      pipe(
        map(
          applySpec<ListingOfferDocumentData>({
            listingId: prop('id'),
            offerId: always(offerSnapshot.id),
            fulfillingStatus: pipe(invoker(0, 'data'), getListingOfferFulfillingStatusForListing(offer))
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.None, 'fulfillingStatus')),
        uniqWith(eqListingOffers)
      )
    )
  )()
}
