import { getSwapsForCollectionQuery } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import { pipe } from 'ramda'

export function getCollectionSwapsCount(slug: Lowercase<string>): Promise<number> {
  return pipe(getSwapsForCollectionQuery, getQueryCount)(slug)
}
