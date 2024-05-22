import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueriesSnapshots } from '@echo/firestore/helpers/crud/query/get-queries-snapshots'
import { Query, type QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { always, andThen, isNil, map, pipe, reject, uniqWith, unless } from 'ramda'

export function getQueriesDocuments<T>(queries: Query<T>[], comparator?: (obj1: T, obj2: T) => boolean): Promise<T[]> {
  return pipe<[Query<T>[]], Promise<QueryDocumentSnapshot<T>[]>, Promise<T[]>>(
    getQueriesSnapshots,
    andThen(
      pipe(
        map(getDocumentSnapshotData<T>),
        reject(isNil),
        unless<T[], T[]>(always(isNil(comparator)), uniqWith<T>(comparator!))
      )
    )
  )(queries)
}
