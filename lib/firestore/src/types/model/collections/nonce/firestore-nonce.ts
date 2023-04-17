import { DocumentData } from 'firebase/firestore'

export interface FirestoreNonce extends DocumentData {
  nonce: string
}
