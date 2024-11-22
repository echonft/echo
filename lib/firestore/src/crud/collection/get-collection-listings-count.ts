import { getListingsForCollectionQuery } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { getQueryCount } from '@echo/firestore/helpers/query/get-query-count'
import { pipe } from 'ramda'

export function getCollectionListingsCount(slug: Lowercase<string>): Promise<number> {
  return pipe(getListingsForCollectionQuery, getQueryCount)(slug)
}
