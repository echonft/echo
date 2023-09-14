import type { FirestoreNftTokenType } from '@echo/firestore/types/model/firestore-nft-token-type'

export interface CollectionResponse {
  id: string
  bannerUrl?: string
  blurUrl?: string
  contract: {
    address: string
    chainId: number
    tokenType: FirestoreNftTokenType
  }
  description: string
  discordUrl?: string
  floorPrice?: number
  name: string
  openSeaUrl?: string
  profilePictureUrl?: string
  slug: string
  totalSupply?: number
  twitterUsername?: string
  websiteUrl?: string
}
