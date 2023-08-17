import { FirestoreSnapshot } from '../../../types/abstract/firestore-snapshot'
import { DocumentData } from 'firebase-admin/firestore'

export const getSnapshotData = <T extends DocumentData>(snapshot: FirestoreSnapshot<T>): T => {
  if (!snapshot.exists) {
    throw Error(`Document does not exist. Path: ${snapshot?.ref?.path} ID: ${snapshot?.id}`)
  }
  return snapshot.data()!
}
