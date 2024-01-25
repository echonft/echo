import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Offer } from '@echo/model/types/offer'
import { pipe } from 'ramda'

export function unchecked_updateOffer(id: string, data: Partial<Omit<Offer, 'id'>>): Promise<Offer> {
  return pipe(getOffersCollectionReference, updateReference<Offer>(id, data))()
}
