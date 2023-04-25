import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { FirestoreContractPrototype } from '../contract/firestore-contract-prototype'
import { FirestoreRequestForOfferItemPrototype } from './firestore-request-for-offer-item-prototype'

export interface FirestoreRequestForOfferPrototype extends FirestorePrototypeData {
  senderId: string
  items: FirestoreRequestForOfferItemPrototype[]
  discordGuildId: string
  target: FirestoreContractPrototype[]
}
