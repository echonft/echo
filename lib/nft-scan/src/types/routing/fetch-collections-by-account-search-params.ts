import type { NftTokenType } from '@echo/model/constants/token-type'
import type { PagingSearchParams } from '@echo/nft-scan/types/routing/paging-search-params'

export interface FetchCollectionsByAccountSearchParams extends PagingSearchParams {
  erc_type: NftTokenType
}
