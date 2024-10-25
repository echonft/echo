import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { querySnapshotIsEmpty } from '@echo/firestore/helpers/query/query-snapshot-is-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore'
import { always, ifElse, isNil, map, pipe, prop, reject } from 'ramda'

export function getQuerySnapshotData<AppModelType>(querySnapshot: QuerySnapshot<AppModelType>): AppModelType[] {
  return ifElse<[QuerySnapshot<AppModelType>], AppModelType[], AppModelType[]>(
    querySnapshotIsEmpty,
    always([]),
    pipe<
      [QuerySnapshot<AppModelType>],
      QueryDocumentSnapshot<AppModelType>[],
      Nullable<AppModelType>[],
      AppModelType[]
    >(
      prop('docs'),
      map<QueryDocumentSnapshot<AppModelType>, Nullable<AppModelType>>(getDocumentSnapshotData<AppModelType>),
      reject(isNil)
    )
  )(querySnapshot)
}
