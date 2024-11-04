import type { Address } from '@echo/model/types/address'

export interface FetchCollectionRequest {
  contract: Address
  showAttribute?: boolean // To fetch the collection attributes. Default: false
}
