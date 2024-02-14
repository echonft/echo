import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { isNil, pipe } from 'ramda'

export async function findOfferThreadsToArchive() {
  const activeOfferThreads = await pipe(
    getOfferThreadsCollectionReference,
    queryWhere('state', '==', 'ACTIVE'),
    getQueryData
  )()
  const offerThreads: OfferThread[] = []
  for (const activeOfferThread of activeOfferThreads) {
    const offer = await findOfferById(activeOfferThread.offerId)
    if (!isNil(offer) && offer.readOnly) {
      offerThreads.push(activeOfferThread)
    }
  }
  return offerThreads
}
