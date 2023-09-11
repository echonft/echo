import AlchemyRoutes from '@echo/alchemy/alchemy-routes'
import getAlchemyRoute from '@echo/alchemy/get-alchemy-route'
import handlePaging from '@echo/alchemy/handle-paging'
import mapGetNftsForOwnerResponse from '@echo/alchemy/map-get-nfts-for-owner-response'
import type { AlchemyNft, GetNftsForOwnerRequest, GetNftsForOwnerResponse } from '@echo/alchemy/types'
import { fetcher } from '@helpers/fetcher'

function fetchNftsForOwner(request: GetNftsForOwnerRequest) {
  return fetcher(getAlchemyRoute(AlchemyRoutes.GET_NFTS_FOR_OWNER))
    .query(request, true)
    .revalidate(3600)
    .fetchResponse<GetNftsForOwnerResponse>()
    .then(mapGetNftsForOwnerResponse)
}

export function getNftsForOwner(owner: string, contractAddresses: string[]) {
  return handlePaging<GetNftsForOwnerRequest, AlchemyNft>(fetchNftsForOwner, { owner, contractAddresses })
}
