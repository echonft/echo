import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'

export async function getReferenceDocumentSnapshot<AppModelType>(
  ref: DocumentReference<AppModelType>
): Promise<DocumentSnapshot<AppModelType>> {
  return ref.get()
}
