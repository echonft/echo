import { FirestoreSwapItem } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreSwapItemData extends Omit<FirestoreSwapItem, 'contract'>, FirestoreDocumentData {
  contract: FirestoreContractData
}
