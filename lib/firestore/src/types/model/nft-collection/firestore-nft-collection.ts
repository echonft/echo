import type { FirestoreContract } from '@echo/firestore/types/model/contract/firestore-contract'

export interface FirestoreNftCollection {
  id: string
  bannerUrl?: URL
  blurUrl?: URL
  contract: FirestoreContract
  description: string
  discordUrl?: URL
  floorPrice?: number
  name: string
  openSeaUrl?: URL
  profilePictureUrl?: URL
  slug: string
  totalSupply?: number
  twitterUsername?: string
  verified: boolean
  websiteUrl?: URL
}
