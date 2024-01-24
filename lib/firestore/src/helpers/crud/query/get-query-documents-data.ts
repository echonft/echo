import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryDocumentsData<T>(query: Query<T>): Promise<T[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotDocumentsData))(query)
}
