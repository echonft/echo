import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { QueryParamsMapper } from '@echo/api/types/routing/query-params/query-params-mapper'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

interface BasePathArgs {
  path: string
  secure: boolean
}

export type PathArgs<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : never
> = [TQueryParams] extends [never]
  ? BasePathArgs
  : BasePathArgs & Record<'queryParamsMapper', QueryParamsMapper<TQueryParams, TSearchParams>>
