import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { pipe } from 'ramda'

export function getListingOffersByOfferId(offerId: string): Promise<ListingOffer[]> {
  return pipe(getListingOffersCollectionReference, queryWhere<ListingOffer>('offerId', '==', offerId), getQueryData)()
}
