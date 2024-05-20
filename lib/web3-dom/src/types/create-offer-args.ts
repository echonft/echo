import type { OfferItem } from '@echo/model/types/offer-item'
import type { HexString } from '@echo/utils/types/hex-string'

// TODO Add value once we turn the fee switch on
export interface CreateOfferArgs {
  chainId: number
  sender: HexString
  receiver: HexString
  senderItems: OfferItem[]
  receiverItems: OfferItem[]
  expiration: number
}
