import { offerThreadsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'

export async function addOfferThread(args: OfferThreadDocument): Promise<string> {
  return setReference({
    collectionReference: offerThreadsCollection(),
    data: args
  })
}
