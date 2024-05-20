import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { omit } from 'ramda'

export function unchecked_updateOfferThread(data: OfferThread) {
  return updateReference<OfferThread>({
    collectionReference: getOfferThreadsCollectionReference(),
    id: data.id,
    data: omit(['id'], data)
  })
}
