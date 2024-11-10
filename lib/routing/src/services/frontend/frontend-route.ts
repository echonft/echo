import { baseUrl } from '@echo/routing/helpers/base-url'
import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type {
  RouteParams,
  RouteQueryParams,
  RouteQueryParamsMapper,
  RouteSearchParams
} from '@echo/routing/types/route'

export class FrontendRoute<
  TParams extends RouteParams = never,
  TQueryParams extends RouteQueryParams = never,
  TSearchParams extends RouteSearchParams = TQueryParams extends RouteSearchParams ? TQueryParams : RouteSearchParams
> extends Route<TParams, TQueryParams, TSearchParams> {
  protected readonly _secure: boolean

  constructor(
    path: Path,
    secure: boolean,
    ...queryParamsMapper: [TQueryParams] extends [never] ? [] : [RouteQueryParamsMapper<TQueryParams, TSearchParams>]
  ) {
    super(path, baseUrl(), ...queryParamsMapper)
    this._secure = secure
  }
  // noinspection JSUnusedGlobalSymbols
  get secure(): boolean {
    return this._secure
  }
}
