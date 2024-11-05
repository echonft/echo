import type { OfferState } from '@echo/model/constants/offer-state'
import type { Item } from '@echo/model/types/item'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import type { HexString } from '@echo/model/types/hex-string'
import type { NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: User & Required<Pick<User, 'wallet'>>
  receiverItems: NonEmptyArray<Item>
  sender: User & Required<Pick<User, 'wallet'>>
  senderItems: NonEmptyArray<Item>
}

export interface Offer extends BaseOffer {
  idContract: Lowercase<HexString>
  locked: boolean
  slug: Slug
  state: OfferState
}
