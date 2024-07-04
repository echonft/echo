import type { EvmAddress } from '@echo/model/types/evm-address'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import type { ContractOfferState } from '@echo/web3/types/contract-offer-state'

export interface ContractOffer {
  readonly sender: EvmAddress
  readonly receiver: EvmAddress
  readonly senderItems: ContractOfferItems
  readonly receiverItems: ContractOfferItems
  readonly expiration: number
  readonly state: ContractOfferState
}
