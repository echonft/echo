import type { Chain } from '@echo/model/constants/chain'
import { isTestnetChain } from '@echo/model/helpers/chain/is-testnet-chain'
import { AbstractPath, type PathArgs, type PathParamsArgs } from '@echo/routing/path/abstract-path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { assoc, dissoc, juxt, pipe, prop } from 'ramda'

interface Params extends Record<PropertyKey, string | string[]> {
  chain: Chain
}

export class OpenseaApiPath<
  TParams extends Params,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TParams, TQueryParams, TSearchParams> {
  constructor(args: Omit<PathArgs<TQueryParams, TSearchParams>, 'baseUrl' | 'secure'>) {
    super(pipe(assoc('secure', true), assoc('baseUrl', ''))(args))
  }

  getUrl(...params: PathParamsArgs<TParams>) {
    this.setBaseUrl(prop('chain', ...(params as [Params])))
    return super.getUrl(...(juxt([dissoc('chain')])(...(params as [Params])) as PathParamsArgs<TParams>))
  }

  protected setBaseUrl(chain: Chain) {
    const url = isTestnetChain(chain) ? 'https://testnets-api.opensea.io/api/v2' : 'https://api.opensea.io/api/v2'
    super.setBaseUrl(url)
  }
}
