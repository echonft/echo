import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingSnapshot(
  slug: string
): Promise<Nullable<QueryDocumentSnapshot<Listing, ListingDocumentData>>> {
  return pipe(getListingsCollectionReference, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getListing(slug: string): Promise<Nullable<Listing>> {
  return pipe(getListingSnapshot, andThen(getDocumentSnapshotData))(slug)
}
