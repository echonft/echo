import type { QueryParams } from '@echo/routing/types/query-params/query-params'

export interface FetchNftsQueryParams extends QueryParams {
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
