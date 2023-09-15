import type { Timestamp } from 'firebase-admin/lib/firestore'

export interface SessionDocumentData {
  expires: Timestamp
  sessionToken: string
  userId: string
}
