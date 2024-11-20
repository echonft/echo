import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'

export async function addOffer(data: OfferDocument): Promise<string> {
  return setReference({
    collectionReference: offersCollection(),
    data
  })
}
