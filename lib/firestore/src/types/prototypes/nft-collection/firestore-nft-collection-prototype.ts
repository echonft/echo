import { FirestorePrototypeData } from '../base/firestore-prototype-data'

export interface FirestoreNftCollectionPrototype extends FirestorePrototypeData {
  bannerUrl?: string
  contractId: string
  description: string
  discordUrl?: string
  discordGuildId: string
  floorPrice?: number
  name: string
  slug: string
  profilePictureUrl?: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: string
}
