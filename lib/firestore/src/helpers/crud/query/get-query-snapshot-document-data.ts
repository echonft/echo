import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshot'
import { QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshotDocumentData<T>(querySnapshot: QuerySnapshot<T>): T | undefined {
  return getQuerySnapshotDocumentSnapshot(querySnapshot)?.data()
}
