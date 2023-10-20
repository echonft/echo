import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { handleAlchemyPaging } from '@echo/alchemy/helpers/handle-alchemy-paging'
import { mapGetNftsForOwnerResponse } from '@echo/alchemy/mappers/map-get-nfts-for-owner-response'
import { type AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { type GetNftsForOwnerRequest } from '@echo/alchemy/types/request/get-nfts-for-owner-request'
import { type GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import { fetcher } from '@helpers/fetcher'
import { partialRight } from 'ramda'

function fetchNftsForOwner(request: GetNftsForOwnerRequest, chainId: number) {
  return fetcher(getAlchemyRoute(AlchemyRoutes.GET_NFTS_FOR_OWNER, chainId))
    .query(request, true)
    .revalidate(3600)
    .fetchResponse<GetNftsForOwnerResponse>()
    .then(mapGetNftsForOwnerResponse(chainId))
}

export function getNftsForOwner(owner: string, contractAddresses: string[], chainId: number) {
  return handleAlchemyPaging<GetNftsForOwnerRequest, AlchemyNft>(partialRight(fetchNftsForOwner, [chainId]), {
    owner,
    contractAddresses
  })
}
