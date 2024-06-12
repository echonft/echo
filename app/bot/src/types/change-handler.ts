import type { DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Client } from 'discord.js'

export interface ChangeHandler<T> {
  client: Client
  changeType: DocumentChangeType
  snapshot: QueryDocumentSnapshot<T>
  logger?: Nullable<Logger>
}
