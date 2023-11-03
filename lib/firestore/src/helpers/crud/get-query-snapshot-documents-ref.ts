import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query-snapshot-is-empty'
import { DocumentReference, QueryDocumentSnapshot, type QuerySnapshot } from 'firebase-admin/firestore'
import { map, pipe, prop } from 'ramda'

export function getQuerySnapshotDocumentsRef<T>(querySnapshot: QuerySnapshot<T>): DocumentReference<T>[] {
  if (querySnapshotIsEmpty(querySnapshot)) {
    return [] as DocumentReference<T>[]
  }
  return pipe(prop('docs'), map<QueryDocumentSnapshot<T>, DocumentReference<T>>(prop('ref')))(querySnapshot)
}
