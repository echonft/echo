import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { pipe } from 'ramda'

export function getListingOffersByOfferId(offerId: string): Promise<ListingOfferDocumentData[]> {
  return pipe(getListingOffersCollectionReference, queryWhere('offerId', '==', offerId), getQueryData)()
}
