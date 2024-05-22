import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getListingOfferFulfillingStatusForOffer } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-offer'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { mapNftsToNftIndexes } from '@echo/model/helpers/nft/map-nfts-to-nft-indexes'
import { type Listing } from '@echo/model/types/listing'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, applySpec, invoker, isNil, juxt, map, pipe, prop, propEq, reject } from 'ramda'

export async function getListingOffersForListing(listing: Listing): Promise<ListingOffer[]> {
  const listingSnapshot = await getListingSnapshot(listing.slug)
  if (isNil(listingSnapshot)) {
    throw Error(`listing with slug ${listing.slug} does not exist`)
  }
  // get pending offers for which sender items intersect listing targets and receiver items intersect listing items
  // then filter out the ones that don't fill the listing
  const listingItemIndexes = mapNftsToNftIndexes(listing.items)
  return pipe(
    getOffersCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    juxt([
      queryWhere('senderItemCollections', 'array-contains', listing.target.collection.slug),
      queryWhere('receiverItemIndexes', 'array-contains-any', listingItemIndexes)
    ]),
    getQueriesSnapshots,
    andThen(
      pipe(
        map(
          applySpec<Omit<ListingOffer, 'id'>>({
            listingId: always(listingSnapshot.id),
            offerId: prop('id'),
            fulfillingStatus: pipe(invoker(0, 'data'), getListingOfferFulfillingStatusForOffer(listing))
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.NONE, 'fulfillingStatus'))
      )
    )
  )()
}
