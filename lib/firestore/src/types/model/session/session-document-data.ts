import { Timestamp } from 'firebase-admin/firestore'

export interface SessionDocumentData {
  expires: Timestamp
  sessionToken: string
  userId: string
}
