import type { FirestoreContract } from '@echo/firestore/types/model/contract/firestore-contract'

export interface NftCollectionDocumentData {
  id: string
  bannerUrl?: string
  blurUrl?: string
  contract: FirestoreContract
  description: string
  discordUrl?: string
  floorPrice?: number
  name: string
  openSeaUrl?: string
  profilePictureUrl?: string
  slug: string
  totalSupply?: number
  twitterUsername?: string
  verified: boolean
  websiteUrl?: string
}

export const nftCollectionFields = [
  'id',
  'bannerUrl',
  'contract.address',
  'contract.chainId',
  'contract.name',
  'contract.symbol',
  'contract.tokenType',
  'description',
  'discordUrl',
  'floorPrice',
  'name',
  'openSeaUrl',
  'profilePictureUrl',
  'slug',
  'totalSupply',
  'twitterUsername',
  'verified',
  'websiteUrl'
]
