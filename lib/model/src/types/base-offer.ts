import type { EvmAddress } from '@echo/model/types/address'
import type { Item } from '@echo/model/types/item'
import { type User } from '@echo/model/types/user'
import { type NonEmptyArray } from 'ramda'

type OfferUser = User & Record<'wallet', EvmAddress>

export interface BaseOffer {
  expiresAt: number
  receiver: OfferUser
  receiverItems: NonEmptyArray<Item>
  sender: OfferUser
  senderItems: NonEmptyArray<Item>
}
