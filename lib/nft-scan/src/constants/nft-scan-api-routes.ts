import { fetchCollectionQueryMapper } from '@echo/nft-scan/routing/fetch-collection-query-mapper'
import { fetchNftQueryMapper } from '@echo/nft-scan/routing/fetch-nft-query-mapper'
import { fetchNftsByAccountQueryMapper } from '@echo/nft-scan/routing/fetch-nfts-by-account-query-mapper'
import { fetchNftsByContractQueryMapper } from '@echo/nft-scan/routing/fetch-nfts-by-contract-query-mapper'
import { NftScanApiRoute } from '@echo/nft-scan/routing/nft-scan-api-route'
import type { FetchNftsByAccountSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-account-search-params'
import type { FetchNftsByContractSearchParams } from '@echo/nft-scan/types/routing/fetch-nfts-by-contract-search-params'
import type { FetchNftsQueryParams } from '@echo/nft-scan/types/routing/fetch-nfts-query-params'
import type { HexString } from '@echo/model/types/hex-string'
import type { OptionalRecord } from '@echo/utils/types/optional-record'

export const nftScanApiRoutes = {
  collection: {
    fetch: new NftScanApiRoute<
      Record<'address', HexString>,
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >('/collections/:address', fetchCollectionQueryMapper)
  },
  nft: {
    fetch: new NftScanApiRoute<
      Record<'address', HexString> & Record<'identifier', string>,
      OptionalRecord<'showAttribute', boolean>,
      Record<'show_attribute', boolean>
    >('/assets/:address/:identifier', fetchNftQueryMapper)
  },
  nfts: {
    fetchByAccount: new NftScanApiRoute<
      Record<'address', HexString>,
      FetchNftsQueryParams,
      FetchNftsByAccountSearchParams
    >('/account/own/:address', fetchNftsByAccountQueryMapper),
    fetchByContract: new NftScanApiRoute<
      Record<'address', HexString>,
      FetchNftsQueryParams,
      FetchNftsByContractSearchParams
    >('/assets/:address', fetchNftsByContractQueryMapper)
  }
}
