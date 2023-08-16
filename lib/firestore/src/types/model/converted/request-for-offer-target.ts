import { NftCollection } from './nft-collection'

export interface RequestForOfferTarget {
  collection: NftCollection
  collectionBannerUrl: URL | undefined
  collectionProfilePictureUrl: URL | undefined
  count: number
}
