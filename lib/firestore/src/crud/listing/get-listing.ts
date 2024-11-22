import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingSnapshot(slug: Lowercase<string>): Promise<Nullable<QueryDocumentSnapshot<ListingDocument>>> {
  return pipe(listingsCollection, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getListing(slug: Lowercase<string>): Promise<Nullable<ListingDocument>> {
  return pipe(getListingSnapshot, andThen(getDocumentSnapshotData))(slug)
}
