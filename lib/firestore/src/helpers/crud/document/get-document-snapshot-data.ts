import type { DocumentSnapshot } from 'firebase-admin/firestore'

export function getDocumentSnapshotData<T>(snapshot: DocumentSnapshot<T>): T | undefined {
  return snapshot.data()
}
