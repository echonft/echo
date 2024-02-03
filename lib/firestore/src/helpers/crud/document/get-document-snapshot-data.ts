import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentSnapshot } from 'firebase-admin/firestore'

export function getDocumentSnapshotData<T>(snapshot: DocumentSnapshot<T>): Nullable<T> {
  return snapshot.data()
}
