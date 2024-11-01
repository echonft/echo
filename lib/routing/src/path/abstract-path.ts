import { PathError } from '@echo/routing/constants/errors/path-error'
import type { PathString } from '@echo/routing/types/path-string'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { QueryParamsMapper } from '@echo/routing/types/query-params/query-params-mapper'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNilOrEmpty } from '@echo/utils/helpers/prop-is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { compile, match } from 'path-to-regexp'
import { stringify } from 'qs'
import { complement, concat, identity, isNil, pipe } from 'ramda'

export interface PathArgs<
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> {
  baseUrl: string
  path: PathString
  secure: boolean
  queryParamsMapper?: QueryParamsMapper<TQueryParams, TSearchParams>
}

export type PathParamsArgs<T> = T[] extends never[] ? T[] : [T]

export abstract class AbstractPath<
  TParams extends Record<PropertyKey, string | string[]> = never,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> {
  readonly secure: boolean
  protected baseUrl: string
  protected readonly path: PathString
  protected readonly queryParamsMapper: QueryParamsMapper<TQueryParams, TSearchParams>
  protected query: Nullable<string>

  protected constructor({ baseUrl, path, secure, queryParamsMapper }: PathArgs<TQueryParams, TSearchParams>) {
    this.baseUrl = baseUrl
    this.setBaseUrl(baseUrl)
    this.path = path
    this.secure = secure
    this.queryParamsMapper = isNil(queryParamsMapper)
      ? (identity as QueryParamsMapper<TQueryParams, TSearchParams>)
      : queryParamsMapper
    this.query = undefined
  }

  test(path: string) {
    return pipe(match(this.path), complement(propIsNilOrEmpty('path')))(path.replace(/\?.*$/, ''))
  }
  get(...params: PathParamsArgs<TParams>): string {
    const compiledPath = compile(this.path, { encode: encodeURIComponent })(...params)
    if (isNilOrEmpty(this.query)) {
      return compiledPath
    }
    return concat(compiledPath, this.query)
  }
  getUrl(...params: PathParamsArgs<TParams>): string {
    return `${this.baseUrl}${this.get(...params)}`
  }
  withQuery(queryParams: TQueryParams): this {
    this.query = stringify(this.queryParamsMapper(queryParams), {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
      skipNulls: true
    })
    return this
  }
  protected setBaseUrl(baseUrl: string) {
    const url = this.getBaseUrl(baseUrl)
    if (nodeEnvironment === NodeEnvironment.Production && url.protocol !== 'https:') {
      throw new Error(PathError.BaseUrlInvalidScheme)
    } else {
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error(PathError.BaseUrlInvalidScheme)
      }
    }
    this.baseUrl = baseUrl
  }
  private getBaseUrl(baseUrl: string): URL {
    try {
      return new URL(baseUrl)
    } catch (_e) {
      throw Error(PathError.BaseUrlInvalid)
    }
  }
}
