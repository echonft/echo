import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'

export function getNewReference<AppModelType>(
  collectionReference: CollectionReference<AppModelType>
): DocumentReference<AppModelType> {
  return collectionReference.doc()
}
