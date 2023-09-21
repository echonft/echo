import type { FirestoreNftTokenType } from '@echo/firestore/types/model/nft/firestore-nft-token-type'
import type { NftAttributeDocumentData } from '@echo/firestore/types/model/nft/nft-attribute-document-data'
import type { NftCollectionDocumentData } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'
import type { UserDetailsDocumentData } from '@echo/firestore/types/model/user/user-details-document-data'

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
  tokenType: FirestoreNftTokenType
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
  'owner.discordAvatar',
  'owner.discordBanner',
  'owner.discordId',
  'owner.discordUsername',
  'owner.username',
  'owner.wallet',
  'owner.wallet.address',
  'owner.wallet.chainId',
  'pictureUrl',
  'thumbnailUrl',
  'tokenId',
  'tokenType'
]
