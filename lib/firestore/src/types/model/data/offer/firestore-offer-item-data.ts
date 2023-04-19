import { FirestoreOfferItem } from '../../collections/offer/firestore-offer-item'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreOfferItemData extends Omit<FirestoreOfferItem, 'contract'>, FirestoreDocumentData {
  contract: FirestoreContractData
}
