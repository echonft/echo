import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { type Listing } from '@echo/model/types/listing'
import type { Username } from '@echo/model/types/username'
import type { Query } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingsForCreatorQuery(username: Username): Query<Listing, ListingDocumentData> {
  return pipe(
    getListingsCollectionReference,
    queryWhere('creator.username', '==', username),
    queryOrderBy('expiresAt', 'desc')
  )()
}
export function getListingsForCreator(username: Username): Promise<Listing[]> {
  return pipe(getListingsForCreatorQuery, getQueryData)(username)
}
