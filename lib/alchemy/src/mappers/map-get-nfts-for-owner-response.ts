import { mapAlchemyNftResponseToAlchemyNft } from '@echo/alchemy/mappers/map-alchemy-nft-response-to-alchemy-nft'
import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import type { AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import type { GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapGetNftsForOwnerResponse(chainId: number) {
  return function (response: GetNftsForOwnerResponse): AlchemyPagingResult<AlchemyNft> {
    return applySpec<AlchemyPagingResult<AlchemyNft>>({
      data: pipe(prop('ownedNfts'), map(mapAlchemyNftResponseToAlchemyNft(chainId))),
      pageKey: prop('pageKey')
    })(response)
  }
}
