import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import { findOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/find-offer-thread-close-request'
import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { isNil, pipe } from 'ramda'

export async function addOfferThreadCloseRequest(
  offerThreadId: string,
  closeAt: number
): Promise<OfferThreadCloseRequest> {
  const offerThread = await findOfferThreadById(offerThreadId)
  if (isNil(offerThread)) {
    throw Error(
      `trying to add a offer thread close request offer thread with id ${offerThreadId} but this thread does not exist`
    )
  }
  const offerThreadCloseRequest = await findOfferThreadCloseRequest(offerThreadId)
  if (!isNil(offerThreadCloseRequest)) {
    return offerThreadCloseRequest
  }
  return pipe(
    getOfferThreadsCloseRequestsCollectionReference,
    setReference<OfferThreadCloseRequest>({
      offerThreadId,
      closeAt
    })
  )()
}
