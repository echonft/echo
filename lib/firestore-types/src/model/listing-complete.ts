import { ListingItem } from './listing-item'
import { ListingState } from './listing-state'
import { ListingTarget } from './listing-target'
import { Nft } from './nft'
import { NftCollection } from './nft-collection'
import { UserDetails } from './user-details'
import type { NonEmptyArray } from '@echo/utils/types'
import { Dayjs } from 'dayjs'

export interface ListingComplete {
  id: string
  createdAt: Dayjs
  creator: UserDetails
  expired: boolean
  expiresAt: Dayjs
  items: NonEmptyArray<ListingItem & { nft: Nft }>
  offersIds: string[]
  state: ListingState
  targets: NonEmptyArray<ListingTarget & { collection: NftCollection }>
}
