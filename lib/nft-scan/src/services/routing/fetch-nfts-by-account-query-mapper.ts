import type { FetchNftsByAccountSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-account-search-params'
import type { FetchNftsQueryParams } from '@echo/nft-scan/types/routing/fetch-nfts-query-params'
import { always, applySpec, defaultTo, pipe, prop } from 'ramda'

export function fetchNftsByAccountQueryMapper(params: FetchNftsQueryParams): FetchNftsByAccountSearchParams {
  return applySpec<FetchNftsByAccountSearchParams>({
    erc_type: always('erc721'),
    cursor: prop('next'),
    limit: pipe(prop('limit'), defaultTo(100)),
    show_attribute: pipe(prop('showAttribute'), defaultTo(true))
  })(params)
}
