import { getOfferSignatureSnapshotById } from '@echo/firestore/crud/offer-signature/get-offer-signature-snapshot-by-id'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { WriteResult } from 'firebase-admin/firestore'

export async function deleteOfferSignature(id: string): Promise<WriteResult> {
  const documentSnapshot = await getOfferSignatureSnapshotById(id)
  assertQueryDocumentSnapshot(documentSnapshot)
  return documentSnapshot.ref.delete()
}
