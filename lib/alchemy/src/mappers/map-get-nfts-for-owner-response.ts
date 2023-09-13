import { mapNft } from '@echo/alchemy/mappers/map-nft'
import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import type { PagingResult } from '@echo/alchemy/types/paging/paging-result'
import type { GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapGetNftsForOwnerResponse(response: GetNftsForOwnerResponse): PagingResult<AlchemyNft> {
  return applySpec({
    data: pipe(prop('ownedNfts'), map(mapNft)),
    pageKey: prop('pageKey')
  })(response)
}
