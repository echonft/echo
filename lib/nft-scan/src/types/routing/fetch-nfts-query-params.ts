import type { RouteQueryParams } from '@echo/routing/types/route'

export interface FetchNftsQueryParams extends RouteQueryParams {
  showAttribute?: boolean // To fetch NFT attributes. Default: true
  limit?: number // Must be between 1 and 100. Default: 20
  next?: string
}
