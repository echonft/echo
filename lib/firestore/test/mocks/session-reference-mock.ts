import type { SessionDocumentData } from '@echo/firestore/types/model/session-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const sessionReferenceMock: { [key: string]: DocumentReference<SessionDocumentData> } = {
  KI5AJISonKCYslDm51Tn: {
    id: 'KI5AJISonKCYslDm51Tn',
    path: 'sessions/KI5AJISonKCYslDm51Tn'
  } as unknown as DocumentReference<SessionDocumentData>
}
