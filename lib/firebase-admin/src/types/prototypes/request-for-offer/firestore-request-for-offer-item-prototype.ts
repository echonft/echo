import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { FirestoreContractPrototype } from '../contract/firestore-contract-prototype'

export interface FirestoreRequestForOfferItemPrototype extends FirestorePrototypeData {
  tokenId: bigint
  balance?: number
  contract: FirestoreContractPrototype
}
