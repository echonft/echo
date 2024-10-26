import { Chain } from '@echo/model/constants/chain'
import { ChainError } from '@echo/model/constants/errors/chain-error'
import { AbstractPath } from '@echo/routing/path/abstract-path'
import type { PathArgs } from '@echo/routing/types/path-args'
import type { PathParams } from '@echo/routing/types/path-params'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { compile } from 'path-to-regexp'
import { assoc, concat, dissoc, isNil, pipe } from 'ramda'

export class NftScanApiPath<
  TParams extends PathParams,
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
    const path = compile<TParams>(this.path, { encode: encodeURIComponent })(params)
    if (isNil(queryParams)) {
      return concat(this.getBaseUrl(params.chain), path)
    }
    return concat(concat(this.getBaseUrl(params.chain), path), this.getQuery(queryParams))
  }

  protected getBaseUrl(chain: Chain) {
    switch (chain) {
      case Chain.Blast:
        return 'https://blastapi.nftscan.com/api/v2'
      case Chain.Ethereum:
        return 'https://restapi.nftscan.com/api/v2'
      case Chain.Sei:
        return 'https://seiapi.nftscan.com/api/v2'
      default:
        throw new Error(ChainError.Unsupported)
    }
  }
}
