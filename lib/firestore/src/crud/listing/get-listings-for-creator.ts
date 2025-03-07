import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingsForCreatorQuery(username: string): Query<ListingDocument> {
  return pipe(listingsCollection, queryWhere('creator.username', '==', username), queryOrderBy('expiresAt', 'desc'))()
}

export function getListingsForCreator(username: string): Promise<ListingDocument[]> {
  return pipe(getListingsForCreatorQuery, getQueryData)(username)
}
