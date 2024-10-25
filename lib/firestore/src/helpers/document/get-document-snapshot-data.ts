import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentSnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function getDocumentSnapshotData<AppModelType>(
  snapshot: Nullable<DocumentSnapshot<AppModelType>>
): Nullable<AppModelType> {
  if (isNil(snapshot) || !snapshot.exists) {
    return undefined
  }
  return snapshot.data()
}
