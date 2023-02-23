import { FirestoreWallet } from './firestore-wallet'
import { DocumentData } from 'firebase/firestore'

export interface FirestoreUser extends DocumentData {
  discordId?: string
  nonce: string
  wallets?: FirestoreWallet[]
}
