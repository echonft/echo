import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import { type QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, prop } from 'ramda'

export function getQuerySnapshotDocumentSnapshots<T>(querySnapshot: QuerySnapshot<T>): QueryDocumentSnapshot<T>[] {
  return ifElse<[QuerySnapshot<T>], QueryDocumentSnapshot<T>[], QueryDocumentSnapshot<T>[]>(
    querySnapshotIsEmpty,
    always([]),
    prop('docs')
  )(querySnapshot)
}
