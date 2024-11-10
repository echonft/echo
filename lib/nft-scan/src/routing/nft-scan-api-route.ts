import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type {
  RouteParams,
  RouteQueryParams,
  RouteQueryParamsMapper,
  RouteSearchParams
} from '@echo/routing/types/route'

export class NftScanApiRoute<
  TParams extends RouteParams = never,
  TQueryParams extends RouteQueryParams = never,
  TSearchParams extends RouteSearchParams = TQueryParams extends RouteSearchParams ? TQueryParams : RouteSearchParams
> extends Route<TParams, TQueryParams, TSearchParams> {
  constructor(
    path: Path,
    ...queryParamsMapper: [TQueryParams] extends [never] ? [] : [RouteQueryParamsMapper<TQueryParams, TSearchParams>]
  ) {
    super(path, 'https://seiapi.nftscan.com/api/v2', ...queryParamsMapper)
  }
}
