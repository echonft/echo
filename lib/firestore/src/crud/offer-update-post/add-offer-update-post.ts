import { findOfferUpdateById } from '@echo/firestore/crud/offer-update/find-offer-update-by-id'
import { findOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/find-offer-update-post'
import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import type { OfferUpdatePost } from '@echo/firestore/types/model/offer-update-post/offer-update-post'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function addOfferUpdatePost(offerUpdateId: string) {
  const offerUpdate = await findOfferUpdateById(offerUpdateId)
  if (isNil(offerUpdate)) {
    throw Error(
      `trying to add an offer update post for offer update with id ${offerUpdateId} but this offer update does not exist`
    )
  }
  const offerUpdatePost = await findOfferUpdatePost(offerUpdateId)
  if (!isNil(offerUpdatePost)) {
    throw Error(`trying to add an offer update post for offer update with id ${offerUpdateId} while it already exists`)
  }
  const reference = getOfferUpdatePostsCollectionReference().doc()
  const newOfferUpdatePost: OfferUpdatePost = {
    id: reference.id,
    offerUpdateId,
    postedAt: now()
  }
  await reference.set(newOfferUpdatePost)
  return newOfferUpdatePost
}
