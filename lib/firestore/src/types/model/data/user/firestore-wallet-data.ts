import { FirestoreWallet } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'

export interface FirestoreWalletData extends FirestoreWallet, FirestoreDocumentData {}
