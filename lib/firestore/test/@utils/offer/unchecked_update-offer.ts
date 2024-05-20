import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Offer } from '@echo/model/types/offer'

export function unchecked_updateOffer(id: string, data: Partial<Omit<Offer, 'id'>>): Promise<Offer> {
  return updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id,
    data
  })
}
