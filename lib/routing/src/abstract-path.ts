import type { PathArgs } from '@echo/routing/types/path-args'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { QueryParamsMapper } from '@echo/routing/types/query-params/query-params-mapper'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import type { Nullable } from '@echo/utils/types/nullable'
import { pathToRegexp } from 'path-to-regexp'
import { stringify } from 'qs'
import { isNil, prop } from 'ramda'

export abstract class AbstractPath<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> {
  secure: boolean
  protected path: string
  protected queryParamsMapper: Nullable<QueryParamsMapper<TQueryParams, TSearchParams>>
  constructor(args: PathArgs<TQueryParams, TSearchParams>) {
    this.path = args.path
    this.secure = args.secure
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.queryParamsMapper = prop('queryParamsMapper', args)
  }

  test(path: string) {
    return pathToRegexp(this.path).test(path)
  }
  protected getQuery(queryParams: TQueryParams) {
    if (isNil(this.queryParamsMapper)) {
      throw Error('search params mapper is not defined')
    }
    return stringify(this.queryParamsMapper(queryParams), {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
      skipNulls: true
    })
  }
}
