import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { pipe } from 'ramda'

export function findListingOfferById(id: string): Promise<ListingOffer | undefined> {
  return pipe(getListingOffersCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
