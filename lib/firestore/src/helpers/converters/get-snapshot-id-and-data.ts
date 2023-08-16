import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { DocumentData } from 'firebase-admin/firestore'

export const getSnapshotIdAndData = <T extends DocumentData>(
  snapshot: FirestoreSnapshot<T>
): { id: string; data: T } => {
  if (!snapshot.exists) {
    throw Error(`Document does not exist. Path: ${snapshot?.ref?.path} ID: ${snapshot?.id}`)
  }
  return {
    id: snapshot.id,
    data: snapshot.data()!
  }
}
