import { DocumentData } from 'firebase/firestore'

export interface FirestoreNftAttribute extends DocumentData {
  trait: string
  value: string
}
