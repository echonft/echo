import { FirestoreRequestForOfferItem } from '../../collections'
import { FirestoreDocumentData } from '../abstract/firestore-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreRequestForOfferItemData
  extends Omit<FirestoreRequestForOfferItem, 'contract'>,
    FirestoreDocumentData {
  contract: FirestoreContractData
}
