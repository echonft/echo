import { getOffersForCollectionQuery } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export async function getPendingOffersForCollection(slug: Slug): Promise<Offer[]> {
  return pipe(getOffersForCollectionQuery, queryWhere('locked', '==', false), getQueryData)(slug)
}
