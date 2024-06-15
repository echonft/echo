import type { DocumentChangeType } from '@echo/firestore/types/document-change-type'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Client } from 'discord.js'

export interface ChangeHandler<T> extends WithLogger {
  client: Client
  changeType: DocumentChangeType
  snapshot: QueryDocumentSnapshot<T>
}
