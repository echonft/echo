import AlchemyRoutes from '@echo/alchemy/alchemy-routes'
import getAlchemyRoute from '@echo/alchemy/get-alchemy-route'
import handlePaging from '@echo/alchemy/handle-paging'
import mapGetOwnersForNftResponse from '@echo/alchemy/map-get-owners-for-nft-response'
import type { GetOwnersForNftRequest, GetOwnersForNftResponse } from '@echo/alchemy/types'
import type { Wallet } from '@echo/firestore-types'
import { fetcher } from '@helpers/fetcher'

function fetchOwnersForNft(request: GetOwnersForNftRequest) {
  return fetcher(getAlchemyRoute(AlchemyRoutes.GET_OWNERS_FOR_NFT))
    .query(request)
    .revalidate(3600)
    .fetchResponse<GetOwnersForNftResponse>()
    .then(mapGetOwnersForNftResponse)
}

export function getOwnersForNft(contractAddress: string, tokenId: number) {
  return handlePaging<GetOwnersForNftRequest, Wallet>(fetchOwnersForNft, { contractAddress, tokenId })
}
