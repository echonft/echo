import { FirestoreUser } from '../../collections'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreWalletData } from './firestore-wallet-data'

export interface FirestoreUserData extends Omit<FirestoreUser, 'wallets'>, FirestoreRootCollectionDocumentData {
  id: string
  wallets: FirestoreWalletData[]
}
