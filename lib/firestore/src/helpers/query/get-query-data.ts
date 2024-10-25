import { getQuerySnapshot } from '@echo/firestore/helpers/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/query/get-query-snapshot-data'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryData<AppModelType>(query: Query<AppModelType>): Promise<AppModelType[]> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotData))(query)
}
