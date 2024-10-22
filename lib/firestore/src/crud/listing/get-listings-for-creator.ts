import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { type Listing } from '@echo/model/types/listing/listing'
import type { Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingsForCreatorQuery(username: string): Query<Listing, ListingDocumentData> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('creator.username', '==', username),
    queryOrderBy('expiresAt', 'desc')
  )()
}
export function getListingsForCreator(username: string): Promise<Listing[]> {
  return pipe(getListingsForCreatorQuery, getQueryData)(username)
}
