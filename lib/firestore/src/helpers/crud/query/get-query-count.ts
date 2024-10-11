import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotCount } from '@echo/firestore/helpers/crud/query/get-query-snapshot-count'
import { type DocumentData, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryCount<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType>
): Promise<number> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotCount))(query)
}
