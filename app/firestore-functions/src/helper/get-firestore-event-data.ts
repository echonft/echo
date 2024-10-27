import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FirestoreEvent, QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'
import { pipe, prop } from 'ramda'

export function getFirestoreEventData<AppModelType, Document = Record<'id', string>>(
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, Document> | undefined
): Nullable<AppModelType> {
  return pipe(prop('data'), unlessNil(getDocumentSnapshotData<AppModelType>))(event)
}
