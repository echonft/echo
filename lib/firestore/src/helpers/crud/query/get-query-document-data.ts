import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryDocumentData<T>(query: Query<T>): Promise<T | undefined> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotDocumentData))(query)
}
