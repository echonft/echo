import { DocumentData } from 'firebase/firestore'

export interface FirestoreSwapActivity extends DocumentData {
  date: number
  fromState?: string
  toState: string
}
