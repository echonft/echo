import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { FirestoreContractPrototype } from '../contract/firestore-contract-prototype'

export interface FirestoreDiscordGuildPrototype extends FirestorePrototypeData {
  channelId: string
  discordId: string
  name: string
  contracts: FirestoreContractPrototype[]
}
