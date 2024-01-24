import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { setReferenceWithId } from '@echo/firestore/helpers/crud/reference/set-reference-with-id'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export function unchecked_addOfferSignature(data: Omit<OfferSignature, 'id' | 'createdAt'>): Promise<OfferSignature> {
  return pipe(getOfferSignaturesCollectionReference, setReferenceWithId(assoc('createdAt', now(), data)))()
}
