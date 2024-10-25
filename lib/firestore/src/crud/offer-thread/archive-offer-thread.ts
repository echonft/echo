import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadSnapshotByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import { offerThreadsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function archiveOfferThread(offerId: string): Promise<Nullable<OfferThreadDocument>> {
  const snapshot = await getOfferThreadSnapshotByOfferId(offerId)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.ThreadNotFound))
  }
  const thread = snapshot.data()
  if (thread.state === OfferThreadState.Archived) {
    return thread
  }
  return updateReference({
    collectionReference: offerThreadsCollection(),
    id: snapshot.id,
    data: { state: OfferThreadState.Archived }
  })
}
