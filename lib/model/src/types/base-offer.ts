import type { Nft } from '@echo/model/types/nft'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: Nft[]
  sender: User
  senderItems: Nft[]
  state: OfferState
}
