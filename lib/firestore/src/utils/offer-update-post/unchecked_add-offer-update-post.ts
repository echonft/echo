import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferUpdatePostDocumentData } from '@echo/firestore/types/model/offer-update-post/offer-update-post-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'

export async function unchecked_addOfferUpdatePost(
  offerUpdateId: string
): Promise<NewDocument<OfferUpdatePostDocumentData>> {
  const data: OfferUpdatePostDocumentData = {
    offerUpdateId,
    postedAt: now()
  }
  const id = await setReference({
    collectionReference: getOfferUpdatePostsCollectionReference(),
    data
  })
  return { id, data }
}
