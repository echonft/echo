import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export type QueryParamsMapper<TQueryParams extends QueryParams, TSearchParams extends SearchParams> = (
  queryParams: TQueryParams
) => TSearchParams
