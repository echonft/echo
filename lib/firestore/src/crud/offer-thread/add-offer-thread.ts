import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { assoc, isNil } from 'ramda'

export async function addOfferThread(
  args: Omit<OfferThreadDocumentData, 'state'>
): Promise<NewDocument<OfferThreadDocumentData>> {
  const offer = await getOfferById(args.offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const data = assoc('state', OfferThreadState.Active, args)
  const id = await setReference<OfferThreadDocumentData, OfferThreadDocumentData>({
    collectionReference: getOfferThreadsCollectionReference(),
    data
  })
  return { id, data }
}
