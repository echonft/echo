import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotDocumentSnapshots } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-snapshots'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { type DocumentData, Query, type QueryDocumentSnapshot, type QuerySnapshot } from 'firebase-admin/firestore'
import { andThen, flatten, isEmpty, map, pipe, reject } from 'ramda'

export function getQueriesSnapshots<AppModelType, DbModelType extends DocumentData>(
  queries: Query<AppModelType, DbModelType>[]
): Promise<QueryDocumentSnapshot<AppModelType, DbModelType>[]> {
  return pipe<
    [Query<AppModelType, DbModelType>[]],
    Promise<QuerySnapshot<AppModelType, DbModelType>>[],
    Promise<QuerySnapshot<AppModelType, DbModelType>[]>,
    Promise<QueryDocumentSnapshot<AppModelType, DbModelType>[]>
  >(
    map(getQuerySnapshot<AppModelType, DbModelType>),
    promiseAll,
    andThen(
      pipe(
        map<QuerySnapshot<AppModelType, DbModelType>, QueryDocumentSnapshot<AppModelType, DbModelType>[]>(
          getQuerySnapshotDocumentSnapshots<AppModelType, DbModelType>
        ),
        reject(isEmpty),
        flatten
      )
    )
  )(queries)
}
