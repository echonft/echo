import { fetchNftsByAccountQueryMapper } from '@echo/opensea/services/routing/fetch-nfts-by-account-query-mapper'
import { OpenseaApiPath } from '@echo/opensea/services/routing/opensea-api-path'
import type { FetchNftsByAccountQueryParams } from '@echo/opensea/types/routing/fetch-nfts-by-account-query-params'
import type { FetchNftsByAccountSearchParams } from '@echo/opensea/types/routing/fetch-nfts-by-account-search-params'
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
    fetch: new OpenseaApiPath<
      {
        chain: ChainName
        address: HexString
      },
      FetchNftsByAccountQueryParams,
      FetchNftsByAccountSearchParams
    >({
      path: '/chain/:chain/account/:address/nfts',
      queryParamsMapper: fetchNftsByAccountQueryMapper
    })
  }
}
