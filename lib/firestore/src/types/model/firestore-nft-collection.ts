import type { FirestoreContract } from '@echo/firestore/types/model/firestore-contract'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'

export interface FirestoreNftCollection {
  id: string
  bannerUrl?: URL
  blurUrl?: URL
  contract: FirestoreContract
  description: string
  discordGuild: FirestoreNftCollectionDiscordGuild
  discordUrl?: URL
  floorPrice?: number
  name: string
  openSeaUrl?: URL
  profilePictureUrl?: URL
  slug: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: URL
}
