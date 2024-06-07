import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { pipe } from 'ramda'

export function getAllListingPosts(): Promise<ListingPost[]> {
  return pipe(getListingPostsCollectionReference, getQueryData)()
}
