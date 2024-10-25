import { offerUpdatePostsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { OfferUpdatePostDocument } from '@echo/firestore/types/model/offer-update-post-document'

export function addOfferUpdatePost(data: OfferUpdatePostDocument): Promise<string> {
  return setReference({
    collectionReference: offerUpdatePostsCollection(),
    data
  })
}
