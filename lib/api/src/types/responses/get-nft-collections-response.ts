import { NftTokenType } from './model/nft-token-type'

export interface GetNftCollectionsResponse {
  collections: {
    id: string
    bannerUrl?: string
    blurUrl?: string
    contract?: {
      address: string
      chainId: number
      tokenType: NftTokenType
    }
    description?: string
    discordUrl?: string
    floorPrice?: number
    name?: string
    openSeaUrl?: string
    profilePictureUrl?: string
    slug?: string
    totalSupply?: number
    twitterUsername?: string
    websiteUrl?: string
  }[]
}
