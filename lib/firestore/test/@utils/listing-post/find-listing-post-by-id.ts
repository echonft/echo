import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { ListingPost } from '@echo/firestore/types/model/listing-post/listing-post'
import { pipe } from 'ramda'

export function findListingPostById(id: string): Promise<ListingPost | undefined> {
  return pipe(getListingPostsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
