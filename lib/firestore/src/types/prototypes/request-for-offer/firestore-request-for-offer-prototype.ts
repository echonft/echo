import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { FirestoreContractPrototype } from '../contract/firestore-contract-prototype'

export interface FirestoreRequestForOfferPrototype extends FirestorePrototypeData {
  senderId: string
  items: string[]
  discordGuildId: string
  target: FirestoreContractPrototype[]
}
