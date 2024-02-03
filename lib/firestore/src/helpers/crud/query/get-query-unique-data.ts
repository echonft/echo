import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotUniqueData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryUniqueData<T>(query: Query<T>): Promise<Nullable<T>> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotUniqueData))(query)
}
