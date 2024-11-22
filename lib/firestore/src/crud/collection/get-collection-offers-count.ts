import { getOffersForCollectionQuery } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import { pipe } from 'ramda'

export function getCollectionOffersCount(slug: Lowercase<string>): Promise<number> {
  return pipe(getOffersForCollectionQuery, getQueryCount)(slug)
}
