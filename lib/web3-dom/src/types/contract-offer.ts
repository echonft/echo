// NOTE: numbers are represented by bigint here, but in fact their type is number
// we do so to avoid error with wagmi configs, but it seems that wagmi automatically convert number to bigint
// so it works at runtime
import type { ContractCreateOffer } from '@echo/web3-dom/types/contract-create-offer'

export interface ContractOffer extends ContractCreateOffer {
  id: string
}
