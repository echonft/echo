import type { Address } from '@echo/model/types/address'
import type { PagingRequest } from '@echo/nft-scan/types/request/paging-request'

export interface FetchCollectionsByAccountRequest extends PagingRequest {
  account: Address
}
