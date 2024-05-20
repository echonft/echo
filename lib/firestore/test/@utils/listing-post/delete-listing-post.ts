import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteListingPost(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getListingPostsCollectionReference(),
    id
  })
}
