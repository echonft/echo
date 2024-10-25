import type { Contract } from '@echo/model/types/contract'

export interface FetchNftsByContractRequest {
  contract: Contract
  limit?: number // Must be between 1 and 200. Default: 50
  next?: string
}
