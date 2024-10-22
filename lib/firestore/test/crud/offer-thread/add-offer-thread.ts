import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import { assoc } from 'ramda'

export async function addOfferThread(args: Omit<OfferThreadDocumentData, 'state'>): Promise<string> {
  return setReference<OfferThreadDocumentData, OfferThreadDocumentData>({
    collectionReference: getOfferThreadsCollectionReference(),
    data: assoc('state', OfferThreadState.Active, args)
  })
}
