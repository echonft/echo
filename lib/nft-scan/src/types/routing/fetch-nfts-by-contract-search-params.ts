import type { PagingSearchParams } from '@echo/nft-scan/types/routing/paging-search-params'

export interface FetchNftsByContractSearchParams extends PagingSearchParams {
  show_attribute: boolean
}
