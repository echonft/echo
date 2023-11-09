import { getQuerySnapshotDocumentsRef } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-ref'
import { DocumentReference, type Query } from 'firebase-admin/firestore'

export async function getQueryDocumentsRef<T>(query: Query<T>): Promise<DocumentReference<T>[]> {
  const querySnapshot = await query.get()
  return getQuerySnapshotDocumentsRef<T>(querySnapshot)
}
