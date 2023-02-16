import { FirestoreContract } from '../../contract/firestore-contract'
import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface FirestoreSwapItem extends DocumentData {
  contract: DocumentReference<FirestoreContract>
  tokenId?: string
  balance?: number
}
