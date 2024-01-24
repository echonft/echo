import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { Query, type QuerySnapshot } from 'firebase-admin/firestore'
import { andThen, eqProps, flatten, map, pipe, uniqWith } from 'ramda'

export function getQueriesDocuments<T extends Record<'id', string>>(queries: Query<T>[]): Promise<T[]> {
  return pipe(
    map(getQuerySnapshot<T>),
    promiseAll,
    andThen(pipe(map<QuerySnapshot<T>, T[]>(getQuerySnapshotData<T>), flatten, uniqWith<T>(eqProps('id'))))
  )(queries)
}
