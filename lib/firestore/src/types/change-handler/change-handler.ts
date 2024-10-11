import type { Awaitable } from '@echo/utils/types/awaitable'
import type { DocumentChangeType, DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'

export interface ChangeHandlerArgs<AppModelType, DbModelType extends DocumentData> {
  changeType: DocumentChangeType
  snapshot: QueryDocumentSnapshot<AppModelType, DbModelType>
}

export type ChangeHandler<AppModelType, DbModelType extends DocumentData> = (
  args: ChangeHandlerArgs<AppModelType, DbModelType>
) => Awaitable<void>
