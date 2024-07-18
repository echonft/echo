import { apiBasePath } from '@echo/api/routing/api/api-base-path'
import { PathWithParams } from '@echo/api/routing/path-with-params'
import type { PathArgs } from '@echo/api/types/routing/path-args'
import type { PathParams } from '@echo/api/types/routing/path-params'
import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import { concat, modify } from 'ramda'

export class ApiPathWithParams<
  TParams extends PathParams,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : never
> extends PathWithParams<TParams, TQueryParams, TSearchParams> {
  constructor(args: PathArgs<TQueryParams, TSearchParams>) {
    super(modify('path', concat(apiBasePath), args) as PathArgs<TQueryParams, TSearchParams>)
  }
}
