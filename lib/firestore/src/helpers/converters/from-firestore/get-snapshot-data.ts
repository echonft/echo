import { type DocumentData, type QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function getSnapshotData<T extends DocumentData>(snapshot: QueryDocumentSnapshot<T>): T {
  if (!snapshot.exists) {
    throw Error(`Document does not exist. Path: ${snapshot?.ref?.path} ID: ${snapshot?.id}`)
  }
  return snapshot.data()!
}
