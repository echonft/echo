import { getOfferSignatureSnapshotById } from '@echo/firestore/crud/offer-signature/get-offer-signature-snapshot-by-id'

export async function findOfferSignatureById(id: string) {
  const documentSnapshot = await getOfferSignatureSnapshotById(id)
  return documentSnapshot?.data()
}
