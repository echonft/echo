import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { now } from '@echo/utils/helpers/now'
import { assoc, pipe } from 'ramda'

export async function unchecked_addOfferSignature(data: Omit<OfferSignature, 'id' | 'createdAt'>) {
  const reference = getOfferSignaturesCollectionReference().doc()
  const id = reference.id
  const offerSignature = pipe(assoc('id', id), assoc('createdAt', now()))(data) as OfferSignature
  await reference.set(offerSignature)
  return offerSignature
}
