import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { Query, type QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, identity, isNil, map, pipe, reject, uniqWith } from 'ramda'

export function getQueriesDocuments<T>(queries: Query<T>[], comparator?: (obj1: T, obj2: T) => boolean): Promise<T[]> {
  const compareFn = isNil(comparator) ? identity<T[]> : uniqWith<T>(comparator)
  return pipe<[Query<T>[]], Promise<QueryDocumentSnapshot<T>[]>, Promise<T[]>>(
    getQueriesSnapshots,
    andThen(pipe(map(getDocumentSnapshotData<T>), reject(isNil), compareFn))
  )(queries)
}
