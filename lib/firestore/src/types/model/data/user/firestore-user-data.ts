import { FirestoreSubcollection } from '../../../abstract/firestore-subcollection'
import { FirestoreUser } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreWalletData } from './subcollections/wallet/firestore-wallet-data'

export interface FirestoreUserData extends Omit<FirestoreUser, 'wallets'>, FirestoreData {
  wallets: FirestoreSubcollection<FirestoreWalletData>
}
