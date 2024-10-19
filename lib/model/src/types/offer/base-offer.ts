import type { Item } from '@echo/model/types/item/item'
import { type User } from '@echo/model/types/user/user'
import type { NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: NonEmptyArray<Item>
  sender: User
  senderItems: NonEmptyArray<Item>
}
