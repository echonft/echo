import { AbstractPath } from '@echo/api/routing/abstract-path'
import type { PathArgs } from '@echo/api/types/routing/path-args'
import type { PathParams } from '@echo/api/types/routing/path-params'
import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import type { ChainName } from '@echo/utils/types/chain-name'
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
  getUrl(params: TParams & Record<'chain', ChainName>, queryParams?: TQueryParams) {
    const path = compile<TParams>(this.path, { encode: encodeURIComponent })(params)
    if (isNil(queryParams)) {
      return concat(this.getBaseUrl(params.chain), path)
    }
    return concat(concat(this.getBaseUrl(params.chain), path), this.getQuery(queryParams))
  }

  protected getBaseUrl(chain: ChainName) {
    switch (chain) {
      case 'blast':
        return 'https://blastapi.nftscan.com/api/v2'
      case 'ethereum':
        return 'https://restapi.nftscan.com/api/v2'
      case 'sei':
        return 'https://seiapi.nftscan.com/api/v2'
      default:
        throw new Error(`Unsupported chain for NFT Scan API: ${chain}`)
    }
  }
}
