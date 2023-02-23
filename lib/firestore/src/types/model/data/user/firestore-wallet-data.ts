import { FirestoreWallet } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'

export interface FirestoreWalletData extends FirestoreWallet, FirestoreData {}
