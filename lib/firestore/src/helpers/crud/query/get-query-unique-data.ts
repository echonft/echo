import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotUniqueData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData, Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryUniqueData<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType>
): Promise<Nullable<AppModelType>> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotUniqueData))(query)
}
