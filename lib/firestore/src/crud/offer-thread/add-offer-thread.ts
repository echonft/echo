import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil } from 'ramda'

export async function addOfferThread(
  thread: Omit<OfferThreadDocumentData, 'postedAt'>
): Promise<NewDocument<OfferThreadDocumentData>> {
  const offer = await getOfferById(thread.offerId)
  if (isNil(offer)) {
    return Promise.reject(
      Error(`trying to add thread for offer with id ${thread.offerId} but this offer does not exist`)
    )
  }
  const data: OfferThreadDocumentData = assoc('postedAt', now(), thread)
  const id = await setReference<OfferThreadDocumentData, OfferThreadDocumentData>({
    collectionReference: getOfferThreadsCollectionReference(),
    data
  })
  return { id, data }
}
