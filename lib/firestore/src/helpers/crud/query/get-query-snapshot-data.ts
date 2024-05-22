import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, isNil, map, pipe, prop, reject } from 'ramda'

export function getQuerySnapshotData<T>(querySnapshot: QuerySnapshot<T>): T[] {
  return ifElse<[QuerySnapshot<T>], T[], T[]>(
    querySnapshotIsEmpty,
    always([]),
    pipe<[QuerySnapshot<T>], QueryDocumentSnapshot<T>[], Nullable<T>[], T[]>(
      prop('docs'),
      map<QueryDocumentSnapshot<T>, Nullable<T>>(getDocumentSnapshotData<T>),
      reject(isNil)
    )
  )(querySnapshot)
}
