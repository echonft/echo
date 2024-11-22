import { getListingsForCollectionQuery } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { pipe } from 'ramda'

export async function getPendingListingsForCollection(slug: Lowercase<string>): Promise<ListingDocument[]> {
  return pipe(getListingsForCollectionQuery, queryWhere('locked', '==', false), getQueryData)(slug)
}
