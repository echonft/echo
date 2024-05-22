import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingOfferSnapshot(
  args: Omit<ListingOffer, 'fulfillingStatus'>
): Promise<Nullable<QueryDocumentSnapshot<ListingOffer>>> {
  const { listingId, offerId } = args
  return pipe(
    getListingOffersCollectionReference,
    queryWhere<ListingOffer>('listingId', '==', listingId),
    queryWhere<ListingOffer>('offerId', '==', offerId),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getListingOffer(args: Omit<ListingOffer, 'fulfillingStatus'>): Promise<Nullable<ListingOffer>> {
  return pipe(getListingOfferSnapshot, andThen(getDocumentSnapshotData))(args)
}
