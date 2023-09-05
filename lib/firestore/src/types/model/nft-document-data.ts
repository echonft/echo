import { NftAttributeDocumentData } from './nft-attribute-document-data'
import { NftCollectionDocumentData } from './nft-collection-document-data'
import { UserDetailsDocumentData } from './user-details-document-data'
import { NftTokenType } from '@echo/firestore-types'

export interface NftDocumentData {
  id: string
  attributes: NftAttributeDocumentData[]
  balance: number
  blurUrl?: string
  collection: NftCollectionDocumentData
  name: string
  openSeaUrl?: string
  owner: UserDetailsDocumentData
  pictureUrl: string
  thumbnailUrl: string
  tokenId: number
  tokenType: NftTokenType
}

export const nftFields = [
  'id',
  'balance',
  'attributes',
  'blurUrl',
  'collection',
  'collection.id',
  'collection.bannerUrl',
  'collection.blurUrl',
  'collection.contract',
  'collection.contract.address',
  'collection.contract.chainId',
  'collection.contract.name',
  'collection.contract.symbol',
  'collection.contract.tokenType',
  'collection.description',
  'collection.discordGuild',
  'collection.discordUrl',
  'collection.floorPrice',
  'collection.name',
  'collection.openSeaUrl',
  'collection.profilePictureUrl',
  'collection.slug',
  'collection.totalSupply',
  'collection.twitterUsername',
  'collection.websiteUrl',
  'name',
  'openSeaUrl',
  'owner',
  'owner.id',
  'owner.discordAvatar',
  'owner.discordBanner',
  'owner.discordId',
  'owner.discordUsername',
  'owner.wallet',
  'owner.wallet.address',
  'owner.wallet.chainId',
  'pictureUrl',
  'thumbnailUrl',
  'tokenId',
  'tokenType'
]
