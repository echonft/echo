import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import type { ContractOfferState } from '@echo/web3/types/contract-offer-state'

export interface ContractOffer {
  sender: HexString
  receiver: HexString
  senderItems: ContractOfferItems
  receiverItems: ContractOfferItems
  expiration: number
  state: ContractOfferState
}
