import type { Contract } from '@echo/model/types/contract'

export interface FetchNftsByContractRequest {
  contract: Contract
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
