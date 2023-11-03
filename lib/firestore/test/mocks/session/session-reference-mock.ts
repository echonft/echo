import { type SessionDocumentData } from '@echo/firestore/types/model/session/session-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const sessionReferenceMock: Record<string, DocumentReference<SessionDocumentData>> = {
  KI5AJISonKCYslDm51Tn: {
    id: 'KI5AJISonKCYslDm51Tn',
    path: 'sessions/KI5AJISonKCYslDm51Tn'
  } as unknown as DocumentReference<SessionDocumentData>
}
