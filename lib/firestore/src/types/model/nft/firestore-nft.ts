import type { FirestoreNftAttribute } from '@echo/firestore/types/model/nft/firestore-nft-attribute'
import type { FirestoreNftTokenType } from '@echo/firestore/types/model/nft/firestore-nft-token-type'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'

export interface FirestoreNft {
  id: string
  attributes: FirestoreNftAttribute[]
  balance: number
  blurUrl?: string
  collection: FirestoreNftCollection
  name: string
  openSeaUrl?: string
  owner: FirestoreUserDetails
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
