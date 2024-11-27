import type { Nullable } from '@echo/utils/types/nullable'
import { Change, type FirestoreEvent, type QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'

export interface FirestoreEventChangeSnapshotDataReturn<AppModelType> {
  after: Nullable<AppModelType>
  before: Nullable<AppModelType>
  // NOTE: This id will either be the before or after id. It should always be present.
  id: Nullable<string>
}

export function firestoreEventChangeSnapshotData<AppModelType, Document = Record<'id', string>>(
  event: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, Document> | undefined
): FirestoreEventChangeSnapshotDataReturn<AppModelType> {
  return {
    after: event?.data?.after.data() as Nullable<AppModelType>,
    before: event?.data?.before.data() as Nullable<AppModelType>,
    id: event?.data?.before.id ?? event?.data?.after.id
  }
}
