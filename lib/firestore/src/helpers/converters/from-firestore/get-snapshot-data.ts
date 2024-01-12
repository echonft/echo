import { type DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function getSnapshotData<AppModelType extends DocumentData, DbModelType extends DocumentData = AppModelType>(
  snapshot: QueryDocumentSnapshot<AppModelType, DbModelType>
): AppModelType {
  if (!snapshot.exists) {
    throw Error(`Document does not exist. Path: ${snapshot?.ref?.path} ID: ${snapshot?.id}`)
  }
  return snapshot.data()
}
