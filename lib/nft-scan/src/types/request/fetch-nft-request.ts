import type { Address } from '@echo/model/types/address'

export interface FetchNftRequest {
  contract: Address
  identifier: string
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
