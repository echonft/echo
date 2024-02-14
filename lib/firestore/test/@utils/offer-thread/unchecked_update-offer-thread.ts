import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { omit, pipe } from 'ramda'

export function unchecked_updateOfferThread(data: OfferThread) {
  return pipe(getOfferThreadsCollectionReference, updateReference<OfferThread>(data.id, omit(['id'], data)))()
}
