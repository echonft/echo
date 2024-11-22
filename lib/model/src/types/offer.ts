import type { OfferState } from '@echo/model/constants/offer-state'
import type { HexString } from '@echo/model/types/hex-string'
import type { Item } from '@echo/model/types/item'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: NonEmptyArray<Item>
  sender: User
  senderItems: NonEmptyArray<Item>
}

export interface Offer extends BaseOffer {
  idContract: Lowercase<HexString>
  locked: boolean
  slug: Lowercase<string>
  state: OfferState
}
