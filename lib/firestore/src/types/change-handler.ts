import type { Awaitable } from '@echo/utils/types/awaitable'
import type { DocumentChangeType, QueryDocumentSnapshot } from 'firebase-admin/firestore'

export interface ChangeHandlerArgs<T> {
  changeType: DocumentChangeType
  snapshot: QueryDocumentSnapshot<T>
}

export type ChangeHandler<T> = (args: ChangeHandlerArgs<T>) => Awaitable<void>
