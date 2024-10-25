import { apiBasePath } from '@echo/routing/path/api-base-path'
import { Path } from '@echo/routing/path/path'
import type { PathArgs } from '@echo/routing/types/path-args'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { concat, modify } from 'ramda'

export class ApiPath<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends Path<TQueryParams, TSearchParams> {
  constructor(args: PathArgs<TQueryParams, TSearchParams>) {
    super(modify('path', concat(apiBasePath), args) as PathArgs<TQueryParams, TSearchParams>)
  }
}
