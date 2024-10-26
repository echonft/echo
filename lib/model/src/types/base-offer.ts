import type { Item } from '@echo/model/types/item'
import type { NftOwner } from '@echo/model/types/nft'
import { type NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: NftOwner
  receiverItems: NonEmptyArray<Item>
  sender: NftOwner
  senderItems: NonEmptyArray<Item>
}
