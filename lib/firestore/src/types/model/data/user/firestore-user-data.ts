import { FirestoreUser } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreWalletData } from './firestore-wallet-data'

export interface FirestoreUserData extends Omit<FirestoreUser, 'wallets'>, FirestoreData {
  id: string
  wallets: FirestoreWalletData[]
}
