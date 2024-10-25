import { getListingsForCollectionQuery } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function getCollectionListingsCount(slug: Slug): Promise<number> {
  return pipe(getListingsForCollectionQuery, getQueryCount)(slug)
}
