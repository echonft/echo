import { getOfferUpdatePost } from '@echo/firestore/crud/offer-update-post/get-offer-update-post'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferUpdatePostDocumentData } from '@echo/firestore/types/model/offer-update-post-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { isNil } from 'ramda'

export async function addOfferUpdatePost(
  data: OfferUpdatePostDocumentData
): Promise<NewDocument<OfferUpdatePostDocumentData>> {
  const offer = await getOfferById(data.offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offerUpdatePost = await getOfferUpdatePost(data)
  if (!isNil(offerUpdatePost)) {
    return Promise.reject(Error(OfferError.UpdatePostExists))
  }
  const id = await setReference<OfferUpdatePostDocumentData, OfferUpdatePostDocumentData>({
    collectionReference: getOfferUpdatePostsCollectionReference(),
    data
  })
  return { id, data }
}
