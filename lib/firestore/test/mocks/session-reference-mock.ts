import type { SessionDocumentData } from '@echo/firestore/types/model/session-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const sessionReferenceMock: { [key: string]: DocumentReference<SessionDocumentData> } = {
  fQyCioCYwsjeLwpiHb61: {
    id: 'fQyCioCYwsjeLwpiHb61',
    path: 'sessions/fQyCioCYwsjeLwpiHb61'
  } as unknown as DocumentReference<SessionDocumentData>
}
