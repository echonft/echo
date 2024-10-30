import type { Nullable } from '@echo/utils/types/nullable'
import type { FirestoreEvent, QueryDocumentSnapshot } from 'firebase-functions/v2/firestore'

export function getFirestoreEventData<AppModelType, Document = Record<'id', string>>(
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, Document> | undefined
): Nullable<AppModelType> {
  return event?.data?.data() as AppModelType
}
