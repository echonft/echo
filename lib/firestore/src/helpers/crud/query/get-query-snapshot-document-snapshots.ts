import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import { type DocumentData, type QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, prop } from 'ramda'

export function getQuerySnapshotDocumentSnapshots<AppModelType, DbModelType extends DocumentData>(
  querySnapshot: QuerySnapshot<AppModelType, DbModelType>
): QueryDocumentSnapshot<AppModelType, DbModelType>[] {
  return ifElse<
    [QuerySnapshot<AppModelType, DbModelType>],
    QueryDocumentSnapshot<AppModelType, DbModelType>[],
    QueryDocumentSnapshot<AppModelType, DbModelType>[]
  >(
    querySnapshotIsEmpty,
    always([]),
    prop('docs')
  )(querySnapshot)
}
