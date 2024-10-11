import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WithId } from '@echo/model/types/with-id'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DocumentData } from 'firebase-admin/firestore'
import type { FirestoreEvent, QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'
import { pipe, prop } from 'ramda'

export function getFirestoreEventData<AppModelType, DbModelType extends DocumentData, Document = WithId>(
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, Document> | undefined
): Nullable<AppModelType> {
  return pipe(prop('data'), unlessNil(getDocumentSnapshotData<AppModelType, DbModelType>))(event)
}
