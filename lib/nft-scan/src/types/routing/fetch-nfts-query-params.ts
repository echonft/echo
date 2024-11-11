import type { PagingQueryParams } from '@echo/nft-scan/types/routing/paging-query-params'

export interface FetchNftsQueryParams extends PagingQueryParams {
  showAttribute?: boolean // To fetch NFT attributes. Default: true
}
