import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData, type DocumentSnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function getDocumentSnapshotData<AppModelType, DbModelType extends DocumentData>(
  snapshot: Nullable<DocumentSnapshot<AppModelType, DbModelType>>
): Nullable<AppModelType> {
  if (isNil(snapshot) || !snapshot.exists) {
    return undefined
  }
  return snapshot.data()
}
