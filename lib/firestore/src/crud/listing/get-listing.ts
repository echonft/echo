import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingSnapshot(slug: Slug): Promise<Nullable<QueryDocumentSnapshot<Listing, ListingDocumentData>>> {
  return pipe(getListingsCollectionReference, queryWhere('slug', '==', slug), getQueryUniqueDocumentSnapshot)()
}

export function getListing(slug: Slug): Promise<Nullable<Listing>> {
  return pipe(getListingSnapshot, andThen(getDocumentSnapshotData))(slug)
}
