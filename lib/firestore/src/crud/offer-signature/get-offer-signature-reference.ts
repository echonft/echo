import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { getOfferSignatureSnapshotById } from '@echo/firestore/crud/offer-signature/get-offer-signature-snapshot-by-id'
import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { isNil } from 'ramda'

export async function getOfferSignatureReference(offerId: string) {
  const existingOfferSignature = await findOfferSignature(offerId)
  if (!isNil(existingOfferSignature)) {
    const snapshot = await getOfferSignatureSnapshotById(existingOfferSignature.id)
    if (!isNil(snapshot)) {
      return snapshot.ref
    }
    return getOfferSignaturesCollectionReference().doc()
  }
  return getOfferSignaturesCollectionReference().doc()
}
