import { DocumentData } from 'firebase/firestore'

export interface FirestoreRequestForOfferActivity extends DocumentData {
  date: number
  fromState?: string
  toState: string
}
