import type { NftTokenType } from '@echo/ui/types/model/nft-token-type'

export interface Collection {
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
  verified: boolean
  websiteUrl?: URL
}
