import { querySnapshotIsEmpty } from '@echo/firestore/helpers/query/query-snapshot-is-empty'
import { type QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, prop } from 'ramda'

export function getQuerySnapshotDocumentSnapshots<AppModelType>(
  querySnapshot: QuerySnapshot<AppModelType>
): QueryDocumentSnapshot<AppModelType>[] {
  return ifElse<
    [QuerySnapshot<AppModelType>],
    QueryDocumentSnapshot<AppModelType>[],
    QueryDocumentSnapshot<AppModelType>[]
  >(
    querySnapshotIsEmpty,
    always([]),
    prop('docs')
  )(querySnapshot)
}
