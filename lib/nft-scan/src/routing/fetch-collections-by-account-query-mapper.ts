import { TokenType } from '@echo/model/constants/token-type'
import type { FetchCollectionsByAccountSearchParams } from '@echo/nft-scan/types/routing/fetch-collections-by-account-search-params'
import type { PagingQueryParams } from '@echo/nft-scan/types/routing/paging-query-params'
import { always, applySpec, defaultTo, pipe, prop } from 'ramda'

export function fetchCollectionsByAccountQueryMapper(params: PagingQueryParams): FetchCollectionsByAccountSearchParams {
  return applySpec<FetchCollectionsByAccountSearchParams>({
    erc_type: always(TokenType.Erc721),
    cursor: prop('next'),
    limit: pipe(prop('limit'), defaultTo(100))
  })(params)
}
