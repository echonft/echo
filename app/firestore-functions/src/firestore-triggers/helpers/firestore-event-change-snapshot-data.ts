import type { Nullable } from '@echo/utils/types/nullable'
import { Change, type FirestoreEvent, type QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'

export interface FirestoreEventChangeSnapshotDataReturn<AppModelType> {
  after: Nullable<AppModelType>
  before: Nullable<AppModelType>
}

export function firestoreEventChangeSnapshotData<AppModelType, Document = Record<'id', string>>(
  event: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, Document> | undefined
): FirestoreEventChangeSnapshotDataReturn<AppModelType> {
  return {
    after: event?.data?.after.data() as Nullable<AppModelType>,
    before: event?.data?.before.data() as Nullable<AppModelType>
  }
}
