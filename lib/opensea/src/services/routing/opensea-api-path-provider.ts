import { OpenseaApiPath } from '@echo/opensea/services/routing/opensea-api-path'
import { pagingQueryMapper } from '@echo/opensea/services/routing/paging-query-mapper'
import type { PagingQueryParams } from '@echo/opensea/types/routing/paging-query-params'
import type { PagingSearchParams } from '@echo/opensea/types/routing/paging-search-params'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export const openseaApiPathProvider = {
  collection: {
    fetch: new OpenseaApiPath<Record<'slug', string>>({
      path: '/collections/:slug'
    })
  },
  contract: {
    fetch: new OpenseaApiPath<{ chain: ChainName; address: HexString }>({
      path: '/chain/:chain/contract/:address'
    })
  },
  nft: {
    fetch: new OpenseaApiPath<{ chain: ChainName; address: HexString; identifier: string }>({
      path: '/chain/:chain/contract/:address/nfts/:identifier'
    })
  },
  nfts: {
    fetchByAccount: new OpenseaApiPath<{ chain: ChainName; address: HexString }, PagingQueryParams, PagingSearchParams>(
      {
        path: '/chain/:chain/account/:address/nfts',
        queryParamsMapper: pagingQueryMapper
      }
    ),
    fetchByContract: new OpenseaApiPath<
      {
        chain: ChainName
        address: HexString
      },
      PagingQueryParams,
      PagingSearchParams
    >({
      path: '/chain/:chain/contract/:address/nfts',
      queryParamsMapper: pagingQueryMapper
    })
  }
}
