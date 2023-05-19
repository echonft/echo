import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreSwapActivityData extends FirestoreDocumentData {
  date: number
  fromState?: string
  toState: string
}
