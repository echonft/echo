import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getQuerySnapshotUniqueData<T>(querySnapshot: QuerySnapshot<T>): Nullable<T> {
  return pipe(getQuerySnapshotUniqueDocumentSnapshot<T>, getDocumentSnapshotData<T>)(querySnapshot)
}
