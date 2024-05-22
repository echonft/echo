import type { Nft } from '@echo/model/types/nft'
import { type OfferState } from '@echo/model/types/offer-state'
import { type User } from '@echo/model/types/user'
import type { WithSlug } from '@echo/model/types/with-slug'

export interface Offer extends WithSlug {
  idContract: string
  createdAt: number
  expiresAt: number
  readOnly: boolean
  receiver: User
  receiverItems: Nft[]
  sender: User
  senderItems: Nft[]
  state: OfferState
  updatedAt: number
}
