import { DocumentData } from 'firebase/firestore'

export interface FirestoreOfferActivity extends DocumentData {
  date: number
  fromState: string | undefined
  toState: string
  data?: object
}
