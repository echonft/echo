import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import { Contract, OfferItem } from '@echo/model'

export interface FirestoreRequestForOfferPrototype extends FirestorePrototypeData {
  senderId: string
  items: OfferItem[]
  discordGuildId: string
  target: Pick<Contract, 'address' | 'chainId'>[]
}
