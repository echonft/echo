import { getQuerySnapshot } from '@echo/firestore/helpers/query/get-query-snapshot'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-snapshot-unique-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { Query, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getQueryUniqueDocumentSnapshot<AppModelType>(
  query: Query<AppModelType>
): Promise<Nullable<QueryDocumentSnapshot<AppModelType>>> {
  return pipe(getQuerySnapshot, andThen(getQuerySnapshotUniqueDocumentSnapshot))(query)
}
