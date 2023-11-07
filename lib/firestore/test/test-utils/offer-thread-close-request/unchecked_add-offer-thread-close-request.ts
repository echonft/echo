import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function unchecked_addOfferThreadCloseRequest(offerThreadId: string, closeAt?: number) {
  const reference = getOfferThreadsCloseRequestsCollectionReference().doc()
  const id = reference.id
  const newOfferThreadCloseRequest: OfferThreadCloseRequest = {
    id,
    offerThreadId,
    closeAt: isNil(closeAt) ? now() : closeAt
  }
  await reference.set(newOfferThreadCloseRequest)
  return newOfferThreadCloseRequest
}
