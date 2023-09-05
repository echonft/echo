import { Id } from './id'
import { NftCollection } from './nft-collection'

export interface ListingTarget {
  collection: Partial<NftCollection> & Id
  amount: number
}
