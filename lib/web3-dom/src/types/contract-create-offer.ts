import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractOfferItem } from '@echo/web3-dom/types/contract-offer-item'
import type { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'

export interface ContractCreateOffer {
  sender: HexString
  receiver: HexString
  senderItems: ContractOfferItem[]
  receiverItems: ContractOfferItem[]
  expiration: number
  state: ContractOfferState
}
