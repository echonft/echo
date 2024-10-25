import { baseUrl } from '@echo/routing/helpers/base-url'
import { productionUrl } from '@echo/routing/helpers/production-url'
import { AbstractPath } from '@echo/routing/path/abstract-path'
import type { PathParams } from '@echo/routing/types/path-params'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
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
    return `${baseUrl()}${this.get(params, queryParams)}`
  }
  getProductionUrl(params: TParams, queryParams?: TQueryParams) {
    return `${productionUrl()}${this.get(params, queryParams)}`
  }
}
