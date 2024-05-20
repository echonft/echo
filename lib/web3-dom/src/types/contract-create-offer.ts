import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import type { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'

export interface ContractCreateOffer {
  sender: HexString
  receiver: HexString
  senderItems: ContractOfferItems
  receiverItems: ContractOfferItems
  expiration: number
  state: ContractOfferState
}
