import { AbstractPath } from '@echo/api/routing/abstract-path'
import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import { concat, isNil } from 'ramda'

export class Path<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TQueryParams, TSearchParams> {
  get(queryParams?: TQueryParams): string {
    if (isNil(queryParams)) {
      return this.path
    }
    return concat(this.path, this.getQuery(queryParams))
  }

  getUrl(queryParams?: TQueryParams) {
    return `${getBaseUrl()}${this.get(queryParams)}`
  }
}
