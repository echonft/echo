import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import { type DocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, isNil, map, pipe, prop, reject } from 'ramda'

export function getQuerySnapshotData<T>(querySnapshot: QuerySnapshot<T>): T[] {
  return ifElse<[QuerySnapshot<T>], T[], T[]>(
    querySnapshotIsEmpty,
    always([]),
    pipe<[QuerySnapshot<T>], DocumentSnapshot<T>[], (T | undefined)[], T[]>(
      prop('docs'),
      map<DocumentSnapshot<T>, T | undefined>(getDocumentSnapshotData<T>),
      reject(isNil)
    )
  )(querySnapshot)
}
