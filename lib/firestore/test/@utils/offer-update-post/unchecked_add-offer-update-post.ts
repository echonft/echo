import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferUpdatePost } from '@echo/firestore/types/model/offer-update-post/offer-update-post'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'

export async function unchecked_addOfferUpdatePost(offerUpdateId: string): Promise<NewDocument<OfferUpdatePost>> {
  const data: OfferUpdatePost = {
    offerUpdateId,
    postedAt: now()
  }
  const id = await setReference<OfferUpdatePost>({
    collectionReference: getOfferUpdatePostsCollectionReference(),
    data
  })
  return { id, data }
}
