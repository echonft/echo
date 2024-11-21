import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type {
  RouteParams,
  RouteQueryParams,
  RouteQueryParamsMapper,
  RouteSearchParams
} from '@echo/routing/types/route'

export class IpfsRoute<
  TParams extends RouteParams,
  TQueryParams extends RouteQueryParams,
  TSearchParams extends RouteSearchParams
> extends Route<TParams, TQueryParams, TSearchParams> {
  constructor(
    path: Path,
    ...queryParamsMapper: [TQueryParams] extends [never] ? [] : [RouteQueryParamsMapper<TQueryParams, TSearchParams>]
  ) {
    super(path, 'https://echo-nft.quicknode-ipfs.com/ipfs', ...queryParamsMapper)
    this.compileOptions = { encode: false }
  }
}
