import { getOfferThreadSnapshot } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { isNil } from 'ramda'

export async function deleteOfferThread(offerId: string): Promise<string> {
  const snapshot = await getOfferThreadSnapshot(offerId)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer thread for offer ${offerId} does not exist`))
  }
  return deleteReference({
    collectionReference: getOfferThreadsCollectionReference(),
    id: snapshot.id
  })
}
