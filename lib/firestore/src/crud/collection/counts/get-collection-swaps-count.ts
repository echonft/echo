import { getSwapsForCollectionQuery } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function getCollectionSwapsCount(slug: Slug): Promise<number> {
  return pipe(getSwapsForCollectionQuery, getQueryCount)(slug)
}
