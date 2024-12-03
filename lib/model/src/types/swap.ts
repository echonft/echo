import type { HexString } from '@echo/model/types/hex-string'
import type { Item } from '@echo/model/types/item'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface Swap {
  offerId: string
  receiver: User
  receiverItems: NonEmptyArray<Item>
  sender: User
  senderItems: NonEmptyArray<Item>
  slug: Lowercase<string>
  transactionId: Lowercase<HexString>
}
