import { getQuerySnapshot } from '@echo/firestore/helpers/query/get-query-snapshot'
import { getQuerySnapshotCount } from '@echo/firestore/helpers/query/get-query-snapshot-count'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryCount<AppModelType>(query: Query<AppModelType>): Promise<number> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotCount))(query)
}
