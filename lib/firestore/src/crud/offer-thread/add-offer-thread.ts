import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { offerThreadsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { assoc, isNil } from 'ramda'

export async function addOfferThread(
  args: Omit<OfferThreadDocument, 'state'>
): Promise<NewDocument<OfferThreadDocument>> {
  const offer = await getOfferById(args.offerId)
  if (isNil(offer)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const data = assoc('state', OfferThreadState.Active, args)
  const id = await setReference({
    collectionReference: offerThreadsCollection(),
    data
  })
  return { id, data }
}
