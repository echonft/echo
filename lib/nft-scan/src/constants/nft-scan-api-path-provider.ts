import { fetchCollectionQueryMapper } from '@echo/nft-scan/routing/fetch-collection-query-mapper'
import { fetchNftQueryMapper } from '@echo/nft-scan/routing/fetch-nft-query-mapper'
import { fetchNftsByAccountQueryMapper } from '@echo/nft-scan/routing/fetch-nfts-by-account-query-mapper'
import { fetchNftsByContractQueryMapper } from '@echo/nft-scan/routing/fetch-nfts-by-contract-query-mapper'
import { NftScanApiPath } from '@echo/nft-scan/routing/nft-scan-api-path'
import type { FetchNftsByAccountSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-account-search-params'
import type { FetchNftsByContractSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-contract-search-params'
import type { FetchNftsQueryParams } from '@echo/nft-scan/types/routing/fetch-nfts-query-params'
import type { HexString } from '@echo/model/types/hex-string'
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
      Record<'address', HexString> & Record<'identifier', string>,
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >({
      path: '/assets/:address/:identifier',
      queryParamsMapper: fetchNftQueryMapper
    })
  },
  nfts: {
    fetchByAccount: new NftScanApiPath<
      Record<'address', HexString>,
      FetchNftsQueryParams,
      FetchNftsByAccountSearchParams
    >({
      path: '/account/own/:address',
      queryParamsMapper: fetchNftsByAccountQueryMapper
    }),
    fetchByContract: new NftScanApiPath<
      Record<'address', HexString>,
      FetchNftsQueryParams,
      FetchNftsByContractSearchParams
    >({
      path: '/assets/:address',
      queryParamsMapper: fetchNftsByContractQueryMapper
    })
  }
}
