import { getQuerySnapshot } from '@echo/firestore/helpers/query/get-query-snapshot'
import { getQuerySnapshotUniqueData } from '@echo/firestore/helpers/query/get-query-snapshot-unique-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryUniqueData<AppModelType>(query: Query<AppModelType>): Promise<Nullable<AppModelType>> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotUniqueData))(query)
}
