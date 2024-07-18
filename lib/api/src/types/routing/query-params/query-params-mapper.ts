import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

export type QueryParamsMapper<TQueryParams extends QueryParams, TSearchParams extends SearchParams> = (
  queryParams: TQueryParams
) => TSearchParams
