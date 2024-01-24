import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Offer } from '@echo/model/types/offer'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function unchecked_updateOffer(id: string, data: Partial<Omit<Offer, 'id'>>): Promise<WriteResult> {
  return pipe(getOffersCollectionReference, updateReference(id, data))()
}
