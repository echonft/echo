import { apiBasePath } from '@echo/routing/path/api-base-path'
import { PathWithParams } from '@echo/routing/path/path-with-params'
import type { PathArgs } from '@echo/routing/types/path-args'
import type { PathParams } from '@echo/routing/types/path-params'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { concat, modify } from 'ramda'

export class ApiPathWithParams<
  TParams extends PathParams,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends PathWithParams<TParams, TQueryParams, TSearchParams> {
  constructor(args: PathArgs<TQueryParams, TSearchParams>) {
    super(modify('path', concat(apiBasePath), args) as PathArgs<TQueryParams, TSearchParams>)
  }
}
