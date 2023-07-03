import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreRequestForOfferActivityData extends FirestoreDocumentData {
  date: number
  fromState?: string
  toState: string
}
