import type { Nft } from '@echo/model/types/nft'
import type { HexString } from '@echo/utils/types/hex-string'

// TODO Add value once we turn the fee switch on
export interface CreateOfferArgs {
  chainId: number
  sender: HexString
  receiver: HexString
  senderItems: Nft[]
  receiverItems: Nft[]
  expiration: number
}
