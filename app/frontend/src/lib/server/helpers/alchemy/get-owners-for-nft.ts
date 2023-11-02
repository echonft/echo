import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { handleAlchemyPaging } from '@echo/alchemy/helpers/handle-alchemy-paging'
import { mapGetOwnersForNftResponse } from '@echo/alchemy/mappers/map-get-owners-for-nft-response'
import { type AlchemyWallet } from '@echo/alchemy/types/model/alchemy-wallet'
import { type GetOwnersForNftRequest } from '@echo/alchemy/types/request/get-owners-for-nft-request'
import { type GetOwnersForNftResponse } from '@echo/alchemy/types/response/get-owners-for-nft-response'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { partialRight } from 'ramda'

function fetchOwnersForNft(request: GetOwnersForNftRequest, chainId: number) {
  return fetcher(getAlchemyRoute(AlchemyRoutes.GET_OWNERS_FOR_NFT, chainId))
    .query(request)
    .disableCache()
    .fetchResponse<GetOwnersForNftResponse>()
    .then(mapGetOwnersForNftResponse(chainId))
}

export function getOwnersForNft(contractAddress: string, tokenId: number, chainId: number) {
  return handleAlchemyPaging<GetOwnersForNftRequest, AlchemyWallet>(partialRight(fetchOwnersForNft, [chainId]), {
    contractAddress,
    tokenId
  })
}
