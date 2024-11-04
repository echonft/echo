import { AbstractPath, type PathArgs } from '@echo/routing/path/abstract-path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { assoc, pipe } from 'ramda'

export class NftScanApiPath<
  TParams extends Record<PropertyKey, string | string[]>,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TParams, TQueryParams, TSearchParams> {
  constructor(args: Omit<PathArgs<TQueryParams, TSearchParams>, 'baseUrl' | 'secure'>) {
    super(pipe(assoc('secure', true), assoc('baseUrl', 'https://seiapi.nftscan.com/api/v2'))(args))
  }
}
