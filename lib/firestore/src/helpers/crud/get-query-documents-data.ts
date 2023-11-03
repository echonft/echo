import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { Query } from 'firebase-admin/firestore'

export async function getQueryDocumentsData<T>(query: Query<T>): Promise<T[]> {
  const querySnapshot = await query.get()
  return getQuerySnapshotDocumentsData<T>(querySnapshot)
}
