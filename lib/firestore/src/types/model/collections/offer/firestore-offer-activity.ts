import { DocumentData } from 'firebase/firestore'

export interface FirestoreOfferActivity extends DocumentData {
  date: number
  fromState?: string
  toState: string
}
