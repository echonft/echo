import { DocumentData } from '@google-cloud/firestore'

export interface FirestoreNftAttribute extends DocumentData {
  trait: string
  value: string
}
