import type { PagingQueryParams } from '@echo/opensea/types/routing/paging-query-params'
import type { PagingSearchParams } from '@echo/opensea/types/routing/paging-search-params'
import { applySpec, defaultTo, pipe, prop } from 'ramda'

export function pagingQueryMapper(params: PagingQueryParams): PagingSearchParams {
  return applySpec<PagingSearchParams>({
    next: prop('next'),
    limit: pipe(prop('limit'), defaultTo(200))
  })(params)
}
