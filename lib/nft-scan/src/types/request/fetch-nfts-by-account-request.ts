import type { Address } from '@echo/model/types/address'
import type { PagingRequest } from '@echo/nft-scan/types/request/paging-request'

export interface FetchNftsByAccountRequest extends PagingRequest {
  account: Address
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
