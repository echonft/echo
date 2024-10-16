import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { QueryParamsMapper } from '@echo/routing/types/query-params/query-params-mapper'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

interface BasePathArgs {
  path: string
  secure: boolean
}

export type PathArgs<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> = [TQueryParams] extends [never]
  ? BasePathArgs
  : BasePathArgs & Record<'queryParamsMapper', QueryParamsMapper<TQueryParams, TSearchParams>>
