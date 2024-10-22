import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadSnapshot } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function archiveOfferThread(offerId: string): Promise<Nullable<OfferThreadDocumentData>> {
  const snapshot = await getOfferThreadSnapshot(offerId)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.ThreadNotFound))
  }
  const thread = snapshot.data()
  if (thread.state === OfferThreadState.Archived) {
    return thread
  }
  return updateReference({
    collectionReference: getOfferThreadsCollectionReference(),
    id: snapshot.id,
    data: { state: OfferThreadState.Archived }
  })
}
