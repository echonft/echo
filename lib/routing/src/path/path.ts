import { productionHostname } from '@echo/routing/constants/production-hostname'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { AbstractPath, type PathArgs, type PathParamsArgs } from '@echo/routing/path/abstract-path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { stringify } from 'qs'
import { assoc } from 'ramda'

export class Path<
  TParams extends Record<PropertyKey, string | string[]> = never,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TParams, TQueryParams, TSearchParams> {
  constructor(args: Omit<PathArgs<TQueryParams, TSearchParams>, 'baseUrl'>) {
    super(assoc('baseUrl', baseUrl(), args))
  }

  getProductionUrl(...params: PathParamsArgs<TParams>): string {
    return `https://${productionHostname}${this.get(...params)}`
  }

  withQuery(queryParams: TQueryParams): this {
    this.query = stringify(this.queryParamsMapper(queryParams), {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
      skipNulls: true
    })
    return this
  }
}
