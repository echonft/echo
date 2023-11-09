import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import type { OfferUpdatePost } from '@echo/firestore/types/model/offer-update-post/offer-update-post'
import { now } from '@echo/utils/helpers/now'

export async function unchecked_addOfferUpdatePost(offerUpdateId: string) {
  const reference = getOfferUpdatePostsCollectionReference().doc()
  const newOfferUpdatePost: OfferUpdatePost = {
    id: reference.id,
    offerUpdateId,
    postedAt: now()
  }
  await reference.set(newOfferUpdatePost)
  return newOfferUpdatePost
}
