import { getListingsForCollectionQuery } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export async function getPendingListingsForCollection(slug: Slug): Promise<Listing[]> {
  return pipe(getListingsForCollectionQuery, queryWhere('locked', '==', false), getQueryData)(slug)
}
