import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentSnapshots } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshots'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { Query, type QueryDocumentSnapshot, type QuerySnapshot } from 'firebase-admin/firestore'
import { andThen, flatten, isEmpty, map, pipe, reject } from 'ramda'

export function getQueriesSnapshots<T>(queries: Query<T>[]): Promise<QueryDocumentSnapshot<T>[]> {
  return pipe<
    [Query<T>[]],
    Promise<QuerySnapshot<T>>[],
    Promise<QuerySnapshot<T>[]>,
    Promise<QueryDocumentSnapshot<T>[]>
  >(
    map(getQuerySnapshot<T>),
    promiseAll,
    andThen(
      pipe(
        map<QuerySnapshot<T>, QueryDocumentSnapshot<T>[]>(getQuerySnapshotDocumentSnapshots<T>),
        reject(isEmpty),
        flatten
      )
    )
  )(queries)
}
