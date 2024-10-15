import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingOfferSnapshot(
  args: Omit<ListingOfferDocumentData, 'fulfillingStatus'>
): Promise<Nullable<QueryDocumentSnapshot<ListingOfferDocumentData, ListingOfferDocumentData>>> {
  const { listingId, offerId } = args
  return pipe(
    getListingOffersCollectionReference,
    queryWhere('listingId', '==', listingId),
    queryWhere('offerId', '==', offerId),
    getQueryUniqueDocumentSnapshot
  )()
}
