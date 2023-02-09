import { FirestoreUser } from './firestore-user'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreWallet extends DocumentData {
  chainId: string
  address: string
  user: DocumentReference<FirestoreUser>
}
