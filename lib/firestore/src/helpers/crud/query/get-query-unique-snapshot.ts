import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'
import type { NonEmptyDocumentSnapshot } from '@echo/firestore/types/non-empty-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { Query } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryUniqueSnapshot<T>(query: Query<T>): Promise<Nullable<NonEmptyDocumentSnapshot<T>>> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotUniqueDocumentSnapshot))(query)
}
