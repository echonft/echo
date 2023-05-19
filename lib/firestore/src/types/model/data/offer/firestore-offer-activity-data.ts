import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreOfferActivityData extends FirestoreDocumentData {
  date: number
  fromState?: string
  toState: string
}
