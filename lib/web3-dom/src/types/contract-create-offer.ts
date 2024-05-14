import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractOfferItems } from '@echo/web3-dom/types/contract-offer-items'
import type { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'

// NOTE: numbers are represented by bigint here, but in fact their type is number
// we do so to avoid error with wagmi configs, but it seems that wagmi automatically convert number to bigint
// so it works at runtime
export interface ContractCreateOffer {
  sender: HexString
  receiver: HexString
  senderItems: ContractOfferItems
  receiverItems: ContractOfferItems
  expiration: bigint
  state: ContractOfferState
}
