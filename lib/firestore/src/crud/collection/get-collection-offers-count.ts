import { getOffersForCollectionQuery } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function getCollectionOffersCount(slug: Slug): Promise<number> {
  return pipe(getOffersForCollectionQuery, getQueryCount)(slug)
}
