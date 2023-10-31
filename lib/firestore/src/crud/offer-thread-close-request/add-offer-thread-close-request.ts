import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import { findOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/find-offer-thread-close-request'
import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import type { OfferThreadCloseRequest } from '@echo/firestore/types/model/offer-thread-close-request/offer-thread-close-request'
import { logger } from '@echo/utils/services/logger'
import { isNil } from 'ramda'

export async function addOfferThreadCloseRequest(offerThreadId: string, closeAt: number) {
  const offerThread = await findOfferThreadById(offerThreadId)
  if (isNil(offerThread)) {
    throw Error(
      `trying to add a offer thread close request offer thread with id ${offerThreadId} but this thread does not exist`
    )
  }
  const offerThreadCloseRequest = await findOfferThreadCloseRequest(offerThreadId)
  if (!isNil(offerThreadCloseRequest)) {
    logger.error(
      `trying to add a offer thread close request offer thread with id ${offerThreadId} but this request already exists`
    )
    return offerThreadCloseRequest
  }
  const reference = getOfferThreadsCloseRequestsCollectionReference().doc()
  const id = reference.id
  const newOfferThreadCloseRequest: OfferThreadCloseRequest = {
    id,
    offerThreadId,
    closeAt
  }
  await reference.set(newOfferThreadCloseRequest)
  return newOfferThreadCloseRequest
}
