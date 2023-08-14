import { DocumentData } from '@google-cloud/firestore'

export interface FirestoreActivity extends DocumentData {
  date: number
  fromState?: string
  toState: string
}
