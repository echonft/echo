import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferUpdatePostDocumentData } from '@echo/firestore/types/model/offer-update-post-document-data'

export async function addOfferUpdatePost(data: OfferUpdatePostDocumentData): Promise<string> {
  return setReference({
    collectionReference: getOfferUpdatePostsCollectionReference(),
    data
  })
}
