import type { Awaitable } from '@echo/utils/types/awaitable'
import type { DocumentChangeType, QueryDocumentSnapshot } from 'firebase-admin/firestore'

export interface ChangeHandlerArgs<AppModelType> {
  changeType: DocumentChangeType
  snapshot: QueryDocumentSnapshot<AppModelType>
}

export type ChangeHandler<AppModelType> = (args: ChangeHandlerArgs<AppModelType>) => Awaitable<void>
