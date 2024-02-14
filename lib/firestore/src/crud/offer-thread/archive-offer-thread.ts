import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, pipe } from 'ramda'

export async function archiveOfferThread(offerThreadId: string): Promise<Nullable<OfferThread>> {
  const offerThread = await findOfferThreadById(offerThreadId)
  if (isNil(offerThread)) {
    throw Error(`offer thread ${offerThreadId} does not exist`)
  }
  return pipe(getOfferThreadsCollectionReference, updateReference<OfferThread>(offerThread.id, { state: 'ARCHIVED' }))()
}
