import type { Contract } from '@echo/model/types/contract'

export interface FetchCollectionRequest {
  contract: Contract
  showAttribute?: boolean // To fetch the collection attributes. Default: false
}
