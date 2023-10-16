import type { Contract } from '@echo/model/types/contract'

export interface Collection {
  id: string
  bannerUrl?: string
  blurUrl?: string
  contract: Contract
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
