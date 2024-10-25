import { offerUpdatePostsCollection } from '@echo/firestore/helpers/collection/collections'
import { deleteReference } from '@echo/firestore/helpers/reference/delete-reference'

export function deleteOfferUpdatePost(id: string): Promise<string> {
  return deleteReference({
    collectionReference: offerUpdatePostsCollection(),
    id
  })
}
