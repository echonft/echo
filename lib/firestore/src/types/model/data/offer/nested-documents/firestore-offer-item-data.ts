import { FirestoreOfferItem } from '../../../collections'
import { FirestoreData } from '../../abstract/firestore-data'
import { FirestoreContractData } from '../../contract/firestore-contract-data'

export interface FirestoreOfferItemData extends Omit<FirestoreOfferItem, 'contract'>, FirestoreData {
  contract: FirestoreContractData
}
