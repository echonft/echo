import type { HexString } from '@echo/model/types/hex-string'
import type { Item } from '@echo/model/types/item'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface Swap {
  receiver: User
  receiverItems: NonEmptyArray<Item>
  sender: User
  senderItems: NonEmptyArray<Item>
  slug: Slug
  transactionId: Lowercase<HexString>
}
