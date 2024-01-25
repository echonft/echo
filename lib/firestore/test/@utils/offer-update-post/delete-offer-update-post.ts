import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteOfferUpdatePost(id: string): Promise<WriteResult> {
  return pipe(getOfferUpdatePostsCollectionReference, deleteReference(id))()
}
