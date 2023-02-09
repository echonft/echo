import { DocumentData } from 'firebase/firestore'

export interface FirestoreSwapActivity extends DocumentData {
  date: number
  fromState: string | undefined
  toState: string
  data?: object
}
