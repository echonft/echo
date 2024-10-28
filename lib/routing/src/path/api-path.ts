import type { PathArgs } from '@echo/routing/path/abstract-path'
import { apiBasePath } from '@echo/routing/path/api-base-path'
import { Path } from '@echo/routing/path/path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { concat, modify } from 'ramda'

export class ApiPath<
  TParams extends Record<PropertyKey, string | string[]> = never,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends Path<TParams, TQueryParams, TSearchParams> {
  constructor(args: Omit<PathArgs<TQueryParams, TSearchParams>, 'baseUrl'>) {
    super(modify('path', concat(apiBasePath), args))
  }
}
