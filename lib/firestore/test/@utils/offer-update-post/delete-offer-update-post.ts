import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { pipe } from 'ramda'

export function deleteOfferUpdatePost(id: string): Promise<string> {
  return pipe(getOfferUpdatePostsCollectionReference, deleteReference(id))()
}
