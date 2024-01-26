import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueriesDocuments } from '@echo/firestore/helpers/crud/query/get-queries-documents'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { getListingOfferFulfillingStatusForListing } from '@echo/firestore/helpers/listing-offer/get-listing-offer-fulfilling-status-for-listing'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { NOT_READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { type Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { now } from '@echo/utils/helpers/now'
import { always, andThen, applySpec, juxt, map, path, pipe, prop, propEq, reject } from 'ramda'

export async function getListingOffersForOffer(offer: Offer): Promise<Omit<ListingOffer, 'id'>[]> {
  // get pending listings for which targets intersect the offer sender items and items intersect the offer receiver items
  // then filter out the ones for which the offer does not fill the listing
  const senderItemsCollections = pipe<[Offer], OfferItem[], string[]>(
    prop('senderItems'),
    map(nonNullableReturn(path(['nft', 'collection', 'id'])))
  )(offer)
  const receiverItems = pipe<[Offer], OfferItem[], string[]>(
    prop('receiverItems'),
    map(nonNullableReturn(path(['nft', 'id'])))
  )(offer)
  return pipe(
    getListingsCollectionReference,
    queryWhere('expiresAt', '>', now()),
    queryOrderBy('expiresAt', 'desc'),
    queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
    juxt([
      queryWhere('targetsIds', 'array-contains-any', senderItemsCollections),
      queryWhere('itemsNftIds', 'array-contains-any', receiverItems)
    ]),
    getQueriesDocuments,
    andThen(
      pipe(
        map(
          applySpec<ListingOffer>({
            listingId: prop('id'),
            offerId: always(offer.id),
            fulfillingStatus: getListingOfferFulfillingStatusForListing(offer)
          })
        ),
        reject(propEq(ListingOfferFulfillingStatus.NONE, 'fulfillingStatus'))
      )
    )
  )()
}
