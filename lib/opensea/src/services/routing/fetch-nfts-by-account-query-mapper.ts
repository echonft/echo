import type { FetchNftsByAccountQueryParams } from '@echo/opensea/types/routing/fetch-nfts-by-account-query-params'
import type { FetchNftsByAccountSearchParams } from '@echo/opensea/types/routing/fetch-nfts-by-account-search-params'
import { applySpec, defaultTo, pipe, prop } from 'ramda'

export function fetchNftsByAccountQueryMapper(params: FetchNftsByAccountQueryParams): FetchNftsByAccountSearchParams {
  return applySpec<FetchNftsByAccountSearchParams>({
    next: prop('next'),
    limit: pipe(prop('limit'), defaultTo(200))
  })(params)
}
