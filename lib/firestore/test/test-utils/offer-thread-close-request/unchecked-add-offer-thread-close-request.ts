import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { now } from '@echo/utils/helpers/now'

export async function uncheckedAddOfferThreadCloseRequest(offerThreadId: string) {
  const reference = getOfferThreadsCloseRequestsCollectionReference().doc()
  const id = reference.id
  const newOfferThreadCloseRequest: OfferThreadCloseRequest = {
    id,
    offerThreadId,
    closeAt: now()
  }
  await reference.set(newOfferThreadCloseRequest)
  return newOfferThreadCloseRequest
}
