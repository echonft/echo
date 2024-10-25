import { getQuerySnapshot } from '@echo/firestore/helpers/query/get-query-snapshot'
import { getQuerySnapshotDocumentSnapshots } from '@echo/firestore/helpers/query/get-query-snapshot-document-snapshots'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { Query, type QueryDocumentSnapshot, type QuerySnapshot } from 'firebase-admin/firestore'
import { andThen, flatten, isEmpty, map, pipe, reject } from 'ramda'

export function getQueriesSnapshots<AppModelType>(
  queries: Query<AppModelType>[]
): Promise<QueryDocumentSnapshot<AppModelType>[]> {
  return pipe<
    [Query<AppModelType>[]],
    Promise<QuerySnapshot<AppModelType>>[],
    Promise<QuerySnapshot<AppModelType>[]>,
    Promise<QueryDocumentSnapshot<AppModelType>[]>
  >(
    map(getQuerySnapshot<AppModelType>),
    promiseAll,
    andThen(
      pipe(
        map<QuerySnapshot<AppModelType>, QueryDocumentSnapshot<AppModelType>[]>(
          getQuerySnapshotDocumentSnapshots<AppModelType>
        ),
        reject(isEmpty),
        flatten
      )
    )
  )(queries)
}
