import { NftTokenType } from './nft-token-type'

export interface NftCollection {
  id: string
  bannerUrl: URL | undefined
  blurUrl: URL | undefined
  contract: {
    address: string
    chainId: number
    tokenType: NftTokenType
  }
  description: string
  discordUrl: URL | undefined
  floorPrice: number | undefined
  name: string
  openSeaUrl: URL | undefined
  profilePictureUrl: URL | undefined
  slug: string
  totalSupply: number | undefined
  twitterUsername: string | undefined
  websiteUrl: URL | undefined
}
