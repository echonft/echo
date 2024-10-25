import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { offerUpdatePostsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { OfferUpdatePostDocument } from '@echo/firestore/types/model/offer-update-post-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { isNil } from 'ramda'

export async function addOfferUpdatePost(data: OfferUpdatePostDocument): Promise<NewDocument<OfferUpdatePostDocument>> {
  const offer = await getOfferById(data.offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offerUpdatePost = await getOfferUpdatePost(data)
  if (!isNil(offerUpdatePost)) {
    return Promise.reject(Error(OfferError.UpdatePostExists))
  }
  const id = await setReference({
    collectionReference: offerUpdatePostsCollection(),
    data
  })
  return { id, data }
}
