import { NftTokenType } from './nft-token-type'

export interface NftCollection {
  id: string
  bannerUrl?: URL
  blurUrl?: URL
  contract: {
    address: string
    chainId: number
    tokenType: NftTokenType
  }
  description: string
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
