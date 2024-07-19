import { apiBasePath } from '@echo/api/routing/api/api-base-path'
import { Path } from '@echo/api/routing/path'
import type { PathArgs } from '@echo/api/types/routing/path-args'
import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import { concat, modify } from 'ramda'

export class ApiPath<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends Path<TQueryParams, TSearchParams> {
  constructor(args: PathArgs<TQueryParams, TSearchParams>) {
    super(modify('path', concat(apiBasePath), args) as PathArgs<TQueryParams, TSearchParams>)
  }
}
