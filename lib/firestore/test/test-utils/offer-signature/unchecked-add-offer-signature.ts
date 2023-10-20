import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import type { OfferSignature } from '@echo/firestore/types/model/offer-signature/offer-signature'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

export async function uncheckedAddOfferSignature(data: Omit<OfferSignature, 'id' | 'createdAt'>) {
  const reference = getOfferSignaturesCollectionReference().doc()
  const id = reference.id
  const offerSignature = pipe(assoc('id', id), assoc('createdAt', dayjs().unix()))(data) as OfferSignature
  await reference.set(offerSignature)
  return offerSignature
}
