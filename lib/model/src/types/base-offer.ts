import type { Item } from '@echo/model/types/item'
import type { UserWithWallet } from '@echo/model/types/user'
import { type NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: UserWithWallet
  receiverItems: NonEmptyArray<Item>
  sender: UserWithWallet
  senderItems: NonEmptyArray<Item>
}
