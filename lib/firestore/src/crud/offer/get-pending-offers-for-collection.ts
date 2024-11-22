import { getOffersForCollectionQuery } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { pipe } from 'ramda'

export async function getPendingOffersForCollection(slug: Lowercase<string>): Promise<OfferDocument[]> {
  return pipe(getOffersForCollectionQuery, queryWhere('locked', '==', false), getQueryData)(slug)
}
