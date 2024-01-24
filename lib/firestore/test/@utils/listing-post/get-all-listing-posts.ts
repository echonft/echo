import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { andThen, pipe } from 'ramda'

export function getAllListingPosts(): Promise<ListingPost[]> {
  return pipe(getListingPostsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
