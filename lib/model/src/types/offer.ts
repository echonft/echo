import type { BaseOffer } from '@echo/model/types/base-offer'
import type { WithId } from '@echo/model/types/with-id'
import type { HexString } from '@echo/utils/types/hex-string'

export interface Offer extends WithId, BaseOffer {
  createdAt: number
  readOnly: boolean
  updatedAt: number
  idContract: HexString
}

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
