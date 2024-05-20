import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferSignature } from '@echo/model/types/offer-signature'
import { now } from '@echo/utils/helpers/now'
import { assoc } from 'ramda'

export async function unchecked_addOfferSignature(
  data: Omit<OfferSignature, 'id' | 'createdAt'>
): Promise<OfferSignature> {
  const offerSignature = assoc('createdAt', now(), data)
  await setReference<OfferSignature>({
    collectionReference: getOfferSignaturesCollectionReference(),
    data: offerSignature
  })
  return offerSignature
}
