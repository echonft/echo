import { AbstractPath } from '@echo/routing/abstract-path'
import type { PathArgs } from '@echo/routing/types/path-args'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Chain } from '@echo/utils/constants/chain'
import { compile } from 'path-to-regexp'
import { always, assoc, concat, dissoc, ifElse, isNil, pipe, prop } from 'ramda'

export class OpenseaApiPath<
  TParams extends Record<PropertyKey, string | string[]>,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TQueryParams, TSearchParams> {
  constructor(args: Omit<PathArgs<TQueryParams, TSearchParams>, 'secure'>) {
    super(
      pipe<[typeof args], Omit<PathArgs<TQueryParams, TSearchParams>, 'secure'>, PathArgs<TQueryParams, TSearchParams>>(
        dissoc('chain') as (obj: typeof args) => Omit<PathArgs<TQueryParams, TSearchParams>, 'secure'>,
        assoc('secure', true) as (
          obj: Omit<PathArgs<TQueryParams, TSearchParams>, 'secure'>
        ) => PathArgs<TQueryParams, TSearchParams>
      )(args)
    )
  }
  getUrl(params: TParams & Record<'chain', Chain>, queryParams?: TQueryParams) {
    const baseUrl = pipe(
      prop('chain'),
      ifElse(isTestnetChain, always('https://testnets-api.opensea.io/api/v2'), always('https://api.opensea.io/api/v2'))
    )(params)
    const path = compile<TParams>(this.path, { encode: encodeURIComponent })(params)
    if (isNil(queryParams)) {
      return concat(baseUrl, path)
    }
    return concat(concat(baseUrl, path), this.getQuery(queryParams))
  }
}
