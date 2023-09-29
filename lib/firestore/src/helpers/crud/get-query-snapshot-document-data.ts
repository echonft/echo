import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { QuerySnapshot } from 'firebase-admin/lib/firestore'

export function getQuerySnapshotDocumentData<T>(querySnapshot: QuerySnapshot<T>): T | undefined {
  return getQuerySnapshotDocumentSnapshot(querySnapshot)?.data()
}
