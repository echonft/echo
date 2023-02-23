import { FirestoreSwapItem } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreSwapItemData extends Omit<FirestoreSwapItem, 'contract'>, FirestoreData {
  contract: FirestoreContractData
}
