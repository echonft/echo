import type { OfferState } from '@echo/model/constants/offer-state'
import type { Item } from '@echo/model/types/item'
import type { Slug } from '@echo/model/types/slug'
import type { UserWithWallet } from '@echo/model/types/user'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: UserWithWallet
  receiverItems: NonEmptyArray<Item>
  sender: UserWithWallet
  senderItems: NonEmptyArray<Item>
}

export interface Offer extends BaseOffer {
  idContract: Lowercase<HexString>
  locked: boolean
  slug: Slug
  state: OfferState
}
