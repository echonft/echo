import { fetchCollectionQueryMapper } from '@echo/nft-scan/services/routing/fetch-collection-query-mapper'
import { fetchNftQueryMapper } from '@echo/nft-scan/services/routing/fetch-nft-query-mapper'
import { fetchNftsByAccountQueryMapper } from '@echo/nft-scan/services/routing/fetch-nfts-by-account-query-mapper'
import { NftScanApiPath } from '@echo/nft-scan/services/routing/nft-scan-api-path'
import type { FetchNftsByAccountQueryParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-account-query-params'
import type { FetchNftsByAccountSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-account-search-params'
import type { HexString } from '@echo/utils/types/hex-string'
import type { OptionalRecord } from '@echo/utils/types/optional-record'

export const nftScanApiPathProvider = {
  collection: {
    fetch: new NftScanApiPath<
      Record<'address', HexString>,
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >({
      path: '/collections/:address',
      queryParamsMapper: fetchCollectionQueryMapper
    })
  },
  nft: {
    fetch: new NftScanApiPath<
      { address: HexString; identifier: string },
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >({
      path: '/assets/:address/:identifier',
      queryParamsMapper: fetchNftQueryMapper
    })
  },
  nfts: {
    fetch: new NftScanApiPath<
      Record<'address', HexString>,
      FetchNftsByAccountQueryParams,
      FetchNftsByAccountSearchParams
    >({
      path: '/account/own/:address',
      queryParamsMapper: fetchNftsByAccountQueryMapper
    })
  }
}
