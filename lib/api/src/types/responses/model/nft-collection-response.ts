import { NftTokenType } from './nft-token-type'

export interface NftCollectionResponse {
  id: string
  bannerUrl?: string
  blurUrl?: string
  contract: {
    address: string
    chainId: number
    tokenType: NftTokenType
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
