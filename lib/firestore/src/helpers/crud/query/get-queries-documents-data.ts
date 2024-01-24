import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-documents-data'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { Query } from 'firebase-admin/firestore'
import { andThen, eqProps, flatten, map, pipe, uniqWith } from 'ramda'

export function getQueriesDocumentsData<T extends Record<'id', string>>(queries: Query<T>[]): Promise<T[]> {
  return pipe(
    map(getQuerySnapshot<T>),
    promiseAll,
    andThen(pipe(map(getQuerySnapshotDocumentsData<T>), flatten, uniqWith<T>(eqProps('id'))))
  )(queries)
}
