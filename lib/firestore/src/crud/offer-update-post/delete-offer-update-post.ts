import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'

export function deleteOfferUpdatePost(id: string): Promise<string> {
  return deleteReference({
    collectionReference: getOfferUpdatePostsCollectionReference(),
    id
  })
}
