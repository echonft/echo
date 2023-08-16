import { DocumentData } from 'firebase-admin/firestore'

export interface ActivityDocumentData extends DocumentData {
  date: number
  fromState?: string
  toState: string
}
