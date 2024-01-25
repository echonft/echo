import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryData<T>(query: Query<T>): Promise<T[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotData))(query)
}
