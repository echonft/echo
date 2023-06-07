import { FirestoreContractPrototype } from '../contract/firestore-contract-prototype'
import { FirestoreDiscordGuildPrototype } from '../discord-guild/firestore-discord-guild-prototype'

export interface FirestoreNftCollectionPrototype {
  bannerUrl?: string
  contract: FirestoreContractPrototype
  description: string
  discordUrl?: string
  discordGuild: FirestoreDiscordGuildPrototype
  floorPrice?: number
  name: string
  profilePictureUrl?: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: string
}
