import type { FirestoreTokenType } from '@echo/firestore/types/model/contract/firestore-token-type'

export interface CollectionResponse {
  id: string
  bannerUrl?: string
  blurUrl?: string
  contract: {
    address: string
    chainId: number
    name?: string
    symbol?: string
    tokenType: FirestoreTokenType
  }
  description: string
  discordUrl?: string
  floorPrice?: number
  name: string
  openSeaUrl?: string
  profilePictureUrl: string
  slug: string
  swapsCount?: number
  totalSupply?: number
  twitterUsername?: string
  verified: boolean
  websiteUrl?: string
}
