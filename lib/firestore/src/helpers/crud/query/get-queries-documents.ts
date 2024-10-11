import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { type DocumentData, Query, type QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, identity, isNil, map, pipe, reject, uniqWith } from 'ramda'

export function getQueriesDocuments<AppModelType, DbModelType extends DocumentData>(
  queries: Query<AppModelType, DbModelType>[],
  comparator?: (obj1: AppModelType, obj2: AppModelType) => boolean
): Promise<AppModelType[]> {
  const compareFn = isNil(comparator) ? identity<AppModelType[]> : uniqWith<AppModelType>(comparator)
  return pipe<
    [Query<AppModelType, DbModelType>[]],
    Promise<QueryDocumentSnapshot<AppModelType, DbModelType>[]>,
    Promise<AppModelType[]>
  >(
    getQueriesSnapshots,
    andThen(pipe(map(getDocumentSnapshotData<AppModelType, DbModelType>), reject(isNil), compareFn))
  )(queries)
}
