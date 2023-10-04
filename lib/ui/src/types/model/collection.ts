import { Contract } from '@echo/ui/types/model/contract'

export interface Collection {
  id: string
  bannerUrl?: URL
  blurUrl?: URL
  contract: Contract
  description: string
  discordUrl?: URL
  floorPrice?: number
  name: string
  openSeaUrl?: URL
  profilePictureUrl: URL
  slug: string
  totalSupply?: number
  twitterUsername?: string
  verified: boolean
  websiteUrl?: URL
}
