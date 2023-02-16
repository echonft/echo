import { FirestoreCollectionReference } from '../../../abstract/firestore-collection-reference'
import { FirestoreUser } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'

export interface FirestoreUserData extends Omit<FirestoreUser, 'wallets'>, FirestoreData {
  wallets: FirestoreCollectionReference
}
