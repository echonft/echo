import { FirestoreWallet } from '../../collections/user/firestore-wallet'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreWalletData extends FirestoreWallet, FirestoreDocumentData {}
