import type { CollectionReference, DocumentData, DocumentReference } from 'firebase-admin/firestore'

export function getNewReference<AppModelType, DbModelType extends DocumentData>(
  collectionReference: CollectionReference<AppModelType, DbModelType>
): DocumentReference<AppModelType, DbModelType> {
  return collectionReference.doc()
}
