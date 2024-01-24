import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { andThen, pipe } from 'ramda'

export function getAllListingOffers(): Promise<ListingOffer[]> {
  return pipe(getListingOffersCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
