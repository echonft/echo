import type { FetchNftsByContractSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-contract-search-params'
import type { FetchNftsQueryParams } from '@echo/nft-scan/types/routing/fetch-nfts-query-params'
import { applySpec, defaultTo, pipe, prop } from 'ramda'

export function fetchNftsByContractQueryMapper(params: FetchNftsQueryParams): FetchNftsByContractSearchParams {
  return applySpec<FetchNftsByContractSearchParams>({
    cursor: prop('next'),
    limit: pipe(prop('limit'), defaultTo(100)),
    show_attribute: pipe(prop('showAttribute'), defaultTo(true))
  })(params)
}
