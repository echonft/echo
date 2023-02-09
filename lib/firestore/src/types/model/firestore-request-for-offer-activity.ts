import { DocumentData } from 'firebase/firestore'

export interface FirestoreRequestForOfferActivity extends DocumentData {
  date: number
  fromState: string | undefined
  toState: string
  data?: object
}
