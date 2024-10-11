import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import { type DocumentData, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryData<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType>
): Promise<AppModelType[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotData))(query)
}
