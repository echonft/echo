import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getOfferUpdateById } from '@echo/firestore/crud/offer-update/get-offer-update-by-id'
import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferUpdatePost } from '@echo/firestore/types/model/offer-update-post/offer-update-post'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function addOfferUpdatePost(offerUpdateId: string): Promise<NewDocument<OfferUpdatePost>> {
  const offerUpdate = await getOfferUpdateById(offerUpdateId)
  if (isNil(offerUpdate)) {
    return Promise.reject(
      Error(
        `trying to add an offer update post for offer update with id ${offerUpdateId} but this offer update does not exist`
      )
    )
  }
  const offerUpdatePost = await getOfferUpdatePost(offerUpdateId)
  if (!isNil(offerUpdatePost)) {
    return Promise.reject(
      Error(`trying to add an offer update post for offer update with id ${offerUpdateId} while it already exists`)
    )
  }
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
