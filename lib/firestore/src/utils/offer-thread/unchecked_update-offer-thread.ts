import { getOfferThreadSnapshot } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { isNil } from 'ramda'

export async function unchecked_updateOfferThread(data: OfferThread) {
  const snapshot = await getOfferThreadSnapshot(data.offerId)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer thread for offer ${data.offerId} does not exist`))
  }
  return updateReference<OfferThread>({
    collectionReference: getOfferThreadsCollectionReference(),
    id: snapshot.id,
    data
  })
}
