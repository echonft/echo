import type { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'

export async function getReferenceDocumentSnapshot<AppModelType, DbModelType extends DocumentData>(
  ref: DocumentReference<AppModelType, DbModelType>
): Promise<DocumentSnapshot<AppModelType, DbModelType>> {
  return ref.get()
}
