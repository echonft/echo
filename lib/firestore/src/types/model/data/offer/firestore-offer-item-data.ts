import { FirestoreOfferItem } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreOfferItemData extends Omit<FirestoreOfferItem, 'contract'>, FirestoreDocumentData {
  contract: FirestoreContractData
}
