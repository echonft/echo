import type { Contract } from '@echo/model/types/contract'

export interface FetchNftRequest {
  contract: Contract
  identifier: string
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
