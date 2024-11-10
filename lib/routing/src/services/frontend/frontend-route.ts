import { baseUrl } from '@echo/routing/helpers/base-url'
import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type {
  RouteParams,
  RouteQueryParams,
  RouteQueryParamsMapper,
  RouteSearchParams
} from '@echo/routing/types/route'

export interface FrontendRouteOptions {
  secure: boolean
}

export class FrontendRoute<
  TParams extends RouteParams = never,
  TQueryParams extends RouteQueryParams = never,
  TSearchParams extends RouteSearchParams = TQueryParams extends RouteSearchParams ? TQueryParams : RouteSearchParams
> extends Route<TParams, TQueryParams, TSearchParams> {
  protected readonly options: FrontendRouteOptions

  constructor(
    path: Path,
    options: FrontendRouteOptions,
    ...queryParamsMapper: [TQueryParams] extends [never] ? [] : [RouteQueryParamsMapper<TQueryParams, TSearchParams>]
  ) {
    super(path, baseUrl(), ...queryParamsMapper)
    this.options = options
  }
  // noinspection JSUnusedGlobalSymbols
  get secure(): boolean {
    return this.options.secure
  }
}
