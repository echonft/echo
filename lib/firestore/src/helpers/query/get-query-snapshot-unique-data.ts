import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-snapshot-unique-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getQuerySnapshotUniqueData<AppModelType>(
  querySnapshot: QuerySnapshot<AppModelType>
): Nullable<AppModelType> {
  return pipe(
    getQuerySnapshotUniqueDocumentSnapshot<AppModelType>,
    getDocumentSnapshotData<AppModelType>
  )(querySnapshot)
}
