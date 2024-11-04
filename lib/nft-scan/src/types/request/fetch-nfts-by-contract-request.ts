import type { Address } from '@echo/model/types/address'

export interface FetchNftsByContractRequest {
  contract: Address
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
