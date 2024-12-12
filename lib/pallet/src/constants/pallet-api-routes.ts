import type { HexString } from '@echo/model/types/hex-string'
import type { SeiAddress } from '@echo/model/types/sei-address'
import { fetchCollectionNftsQueryMapper } from '@echo/pallet/routing/fetch-collection-nfts-query-mapper'
import { PalletApiRoute } from '@echo/pallet/routing/pallet-api-route'
import type { PagingQueryParams } from '@echo/pallet/types/routing/paging-query-params'
import type { PagingSearchParams } from '@echo/pallet/types/routing/paging-search-params'

export const palletApiRoutes = {
  nfts: {
    fetchByAccount: new PalletApiRoute<Record<'address', HexString>>('/v3/user/:address/tokens?network=mainnet'),
    fetchByCollection: new PalletApiRoute<Record<'seiAddress', SeiAddress>, PagingQueryParams, PagingSearchParams>(
      '/v3/nfts/:seiAddress/tokens',
      fetchCollectionNftsQueryMapper
    )
  },
  collections: {
    fetchDetails: new PalletApiRoute<Record<'seiAddress', SeiAddress>>('/v2/nfts/:seiAddress/details')
  }
}
