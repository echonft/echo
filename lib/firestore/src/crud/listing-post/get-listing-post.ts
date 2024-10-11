import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingPostSnapshot(
  listingId: string,
  guildId: string
): Promise<Nullable<QueryDocumentSnapshot<ListingPostDocumentData, ListingPostDocumentData>>> {
  return pipe(
    getListingPostsCollectionReference,
    queryWhere('listingId', '==', listingId),
    queryWhere('guild.id', '==', guildId),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getListingPost(listingId: string, guildId: string): Promise<Nullable<ListingPostDocumentData>> {
  return pipe(getListingPostSnapshot, andThen(getDocumentSnapshotData))(listingId, guildId)
}
