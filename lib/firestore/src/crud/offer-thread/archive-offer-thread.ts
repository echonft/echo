import { getOfferThreadSnapshot } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function archiveOfferThread(offerId: string): Promise<Nullable<OfferThread>> {
  const snapshot = await getOfferThreadSnapshot(offerId)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer thread for offer ${offerId} does not exist`))
  }
  return updateReference<OfferThread>({
    collectionReference: getOfferThreadsCollectionReference(),
    id: snapshot.id,
    data: { state: 'ARCHIVED' }
  })
}
