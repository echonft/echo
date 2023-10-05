import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query-snapshot-is-empty'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export function assertQuerySnapshot<T>(
  querySnapshot: QuerySnapshot<T> | undefined
): asserts querySnapshot is Omit<QuerySnapshot<T>, 'empty' | 'docs'> &
  Record<'empty', false> &
  Record<'docs', NonEmptyArray<QueryDocumentSnapshot<T>>> {
  if (isNil(querySnapshot) || querySnapshotIsEmpty(querySnapshot)) {
    throw Error('query snapshot is empty')
  }
}
