import type { Item } from '@echo/model/types/item/item'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user/user'
import type { NonEmptyArray } from 'ramda'

export interface Swap {
  receiver: User
  receiverItems: NonEmptyArray<Item>
  sender: User
  senderItems: NonEmptyArray<Item>
  slug: Slug
  transactionId: string
}
