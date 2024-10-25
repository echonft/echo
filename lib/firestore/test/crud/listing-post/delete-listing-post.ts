import { listingPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteListingPost(id: string): Promise<string> {
  return deleteReference({
    collectionReference: listingPostsCollection(),
    id
  })
}
