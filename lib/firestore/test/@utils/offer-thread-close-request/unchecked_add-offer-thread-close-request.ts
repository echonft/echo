import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { now } from '@echo/utils/helpers/now'
import { isNil, pipe } from 'ramda'

export function unchecked_addOfferThreadCloseRequest(offerThreadId: string, closeAt?: number) {
  return pipe(
    getOfferThreadsCloseRequestsCollectionReference,
    setReference({
      offerThreadId,
      closeAt: isNil(closeAt) ? now() : closeAt
    })
  )()
}
