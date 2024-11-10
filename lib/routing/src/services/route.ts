import type { Path } from '@echo/routing/types/path'
import type {
  RouteParams,
  RouteParamsArgs,
  RouteQueryParams,
  RouteQueryParamsMapper,
  RouteSearchParams
} from '@echo/routing/types/route'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNilOrEmpty } from '@echo/utils/helpers/prop-is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { compile, match } from 'path-to-regexp'
import { stringify } from 'qs'
import { complement, concat, head, isNil, pipe } from 'ramda'

export abstract class Route<
  TParams extends RouteParams = never,
  TQueryParams extends RouteQueryParams = never,
  TSearchParams extends RouteSearchParams = TQueryParams extends RouteSearchParams ? TQueryParams : RouteSearchParams
> {
  protected readonly baseUrl: string
  protected readonly path: Path
  protected readonly queryParamsMapper: Nullable<RouteQueryParamsMapper<TQueryParams, TSearchParams>>
  protected query: Nullable<string>

  protected constructor(
    path: Path,
    baseUrl: string,
    ...queryParamsMapper: [TQueryParams] extends [never] ? [] : [RouteQueryParamsMapper<TQueryParams, TSearchParams>]
  ) {
    this.baseUrl = baseUrl
    this.path = path
    this.queryParamsMapper = head(queryParamsMapper)
    this.query = undefined
  }

  test(path: string) {
    return pipe(match(this.path), complement(propIsNilOrEmpty('path')))(path.replace(/\?.*$/, ''))
  }

  get(...params: RouteParamsArgs<TParams>): string {
    const compiledPath = compile(this.path, { encode: encodeURIComponent })(...params)
    if (isNilOrEmpty(this.query)) {
      return compiledPath
    }
    return concat(compiledPath, this.query)
  }

  getUrl(...params: RouteParamsArgs<TParams>): string {
    return `${this.baseUrl}${this.get(...params)}`
  }

  withQuery(queryParams: TQueryParams): this {
    if (!isNil(this.queryParamsMapper)) {
      this.query = stringify(this.queryParamsMapper(queryParams), {
        addQueryPrefix: true,
        arrayFormat: 'repeat',
        skipNulls: true
      })
    }
    return this
  }
}
