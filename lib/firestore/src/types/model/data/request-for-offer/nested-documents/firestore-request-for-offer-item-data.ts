import { FirestoreRequestForOfferItem } from '../../../collections'
import { FirestoreData } from '../../abstract/firestore-data'
import { FirestoreContractData } from '../../contract/firestore-contract-data'

export interface FirestoreRequestForOfferItemData
  extends Omit<FirestoreRequestForOfferItem, 'contract'>,
    FirestoreData {
  contract: FirestoreContractData
}
