import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData, Query, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryUniqueDocumentSnapshot<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType>
): Promise<Nullable<QueryDocumentSnapshot<AppModelType, DbModelType>>> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotUniqueDocumentSnapshot))(query)
}
