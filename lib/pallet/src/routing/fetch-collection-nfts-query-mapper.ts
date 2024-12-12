import type { FetchCollectionNftsQueryParams } from '@echo/pallet/types/routing/fetch-collection-nfts-query-params'
import type { FetchCollectionNftsSearchParams } from '@echo/pallet/types/routing/fetch-collection-nfts-search-params'
import { pipe, prop } from 'ramda'

export function fetchCollectionNftsQueryMapper(
  params: FetchCollectionNftsQueryParams
): FetchCollectionNftsSearchParams {
  return {
    page: pipe(prop('page'), String)(params),
    page_size: pipe(prop('pageSize'), String)(params)
  }
}
