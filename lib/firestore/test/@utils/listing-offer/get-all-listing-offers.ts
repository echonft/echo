import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { pipe } from 'ramda'

export function getAllListingOffers(): Promise<ListingOffer[]> {
  return pipe(getListingOffersCollectionReference, getQueryData)()
}
