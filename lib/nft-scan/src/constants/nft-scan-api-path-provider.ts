import type { Chain } from '@echo/model/constants/chain'
import { fetchCollectionQueryMapper } from '@echo/nft-scan/services/routing/fetch-collection-query-mapper'
import { fetchNftQueryMapper } from '@echo/nft-scan/services/routing/fetch-nft-query-mapper'
import { fetchNftsByAccountQueryMapper } from '@echo/nft-scan/services/routing/fetch-nfts-by-account-query-mapper'
import { fetchNftsByContractQueryMapper } from '@echo/nft-scan/services/routing/fetch-nfts-by-contract-query-mapper'
import { NftScanApiPath } from '@echo/nft-scan/services/routing/nft-scan-api-path'
import type { FetchNftsByAccountSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-account-search-params'
import type { FetchNftsByContractSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-contract-search-params'
import type { FetchNftsQueryParams } from '@echo/nft-scan/types/routing/fetch-nfts-query-params'
import type { HexString } from '@echo/utils/types/hex-string'
import type { OptionalRecord } from '@echo/utils/types/optional-record'

export const nftScanApiPathProvider = {
  collection: {
    fetch: new NftScanApiPath<
      { address: HexString; chain: Chain },
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >({
      path: '/collections/:address',
      queryParamsMapper: fetchCollectionQueryMapper
    })
  },
  nft: {
    fetch: new NftScanApiPath<
      { address: HexString; chain: Chain; identifier: string },
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >({
      path: '/assets/:address/:identifier',
      queryParamsMapper: fetchNftQueryMapper
    })
  },
  nfts: {
    fetchByAccount: new NftScanApiPath<
      { address: HexString; chain: Chain },
      FetchNftsQueryParams,
      FetchNftsByAccountSearchParams
    >({
      path: '/account/own/:address',
      queryParamsMapper: fetchNftsByAccountQueryMapper
    }),
    fetchByContract: new NftScanApiPath<
      { address: HexString; chain: Chain },
      FetchNftsQueryParams,
      FetchNftsByContractSearchParams
    >({
      path: '/assets/:address',
      queryParamsMapper: fetchNftsByContractQueryMapper
    })
  }
}
