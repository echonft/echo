import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueriesSnapshots } from '@echo/firestore/helpers/query/get-queries-snapshots'
import { Query, type QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, identity, isNil, map, pipe, reject, uniqWith } from 'ramda'

export function getQueriesDocuments<AppModelType>(
  queries: Query<AppModelType>[],
  comparator?: (obj1: AppModelType, obj2: AppModelType) => boolean
): Promise<AppModelType[]> {
  const compareFn = isNil(comparator) ? identity<AppModelType[]> : uniqWith<AppModelType>(comparator)
  return pipe<[Query<AppModelType>[]], Promise<QueryDocumentSnapshot<AppModelType>[]>, Promise<AppModelType[]>>(
    getQueriesSnapshots,
    andThen(pipe(map(getDocumentSnapshotData<AppModelType>), reject(isNil), compareFn))
  )(queries)
}
