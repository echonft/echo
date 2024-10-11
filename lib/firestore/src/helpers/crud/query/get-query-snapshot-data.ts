import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { querySnapshotIsEmpty } from '@echo/firestore/helpers/crud/query/query-snapshot-is-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, isNil, map, pipe, prop, reject } from 'ramda'

export function getQuerySnapshotData<AppModelType, DbModelType extends DocumentData>(
  querySnapshot: QuerySnapshot<AppModelType, DbModelType>
): AppModelType[] {
  return ifElse<[QuerySnapshot<AppModelType, DbModelType>], AppModelType[], AppModelType[]>(
    querySnapshotIsEmpty,
    always([]),
    pipe<
      [QuerySnapshot<AppModelType, DbModelType>],
      QueryDocumentSnapshot<AppModelType, DbModelType>[],
      Nullable<AppModelType>[],
      AppModelType[]
    >(
      prop('docs'),
      map<QueryDocumentSnapshot<AppModelType, DbModelType>, Nullable<AppModelType>>(
        getDocumentSnapshotData<AppModelType, DbModelType>
      ),
      reject(isNil)
    )
  )(querySnapshot)
}
