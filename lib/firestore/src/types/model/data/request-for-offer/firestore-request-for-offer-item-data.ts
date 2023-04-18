import { FirestoreRequestForOfferItem } from '../../collections/request-for-offer/firestore-request-for-offer-item'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreRequestForOfferItemData
  extends Omit<FirestoreRequestForOfferItem, 'contract'>,
    FirestoreDocumentData {
  contract: FirestoreContractData
}
