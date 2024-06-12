import type { DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import type { Client } from 'discord.js'

export interface ChangeHandler<T> {
  client: Client
  changeType: DocumentChangeType
  snapshot: QueryDocumentSnapshot<T>
}
