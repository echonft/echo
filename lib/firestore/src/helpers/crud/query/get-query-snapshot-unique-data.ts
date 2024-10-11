import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData, QuerySnapshot } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getQuerySnapshotUniqueData<AppModelType, DbModelType extends DocumentData>(
  querySnapshot: QuerySnapshot<AppModelType, DbModelType>
): Nullable<AppModelType> {
  return pipe(
    getQuerySnapshotUniqueDocumentSnapshot<AppModelType, DbModelType>,
    getDocumentSnapshotData<AppModelType, DbModelType>
  )(querySnapshot)
}
