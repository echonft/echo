import { AbstractPath } from '@echo/api/routing/abstract-path'
import type { PathParams } from '@echo/api/types/routing/path-params'
import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import { getProductionUrl } from '@echo/utils/helpers/get-production-url'
import { compile } from 'path-to-regexp'
import { concat, isNil } from 'ramda'

export class PathWithParams<
  TParams extends PathParams,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TQueryParams, TSearchParams> {
  get(params: TParams, queryParams?: TQueryParams): string {
    const path = compile<TParams>(this.path, { encode: encodeURIComponent })(params)
    if (isNil(queryParams)) {
      return path
    }
    return concat(path, this.getQuery(queryParams))
  }

  getUrl(params: TParams, queryParams?: TQueryParams) {
    return `${getBaseUrl()}${this.get(params, queryParams)}`
  }
  getProductionUrl(params: TParams, queryParams?: TQueryParams) {
    return `${getProductionUrl()}${this.get(params, queryParams)}`
  }
}
