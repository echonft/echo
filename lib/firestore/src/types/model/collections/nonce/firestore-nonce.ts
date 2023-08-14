import { DocumentData } from '@google-cloud/firestore'

export interface FirestoreNonce extends DocumentData {
  nonce: string
}
