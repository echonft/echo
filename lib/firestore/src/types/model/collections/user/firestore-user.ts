import { FirestoreWallet } from './subcollections/wallet/firestore-wallet'
import { CollectionReference, DocumentData } from 'firebase/firestore'

export interface FirestoreUser extends DocumentData {
  discordId: string
  nonce?: string
  wallets: CollectionReference<FirestoreWallet>
}
