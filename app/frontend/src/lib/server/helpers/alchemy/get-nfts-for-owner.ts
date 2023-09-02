import { fetcher } from '../../../helpers/fetcher'
import {
  AlchemyNft,
  AlchemyRoutes,
  getAlchemyRoute,
  GetNftsForOwnerRequest,
  GetNftsForOwnerResponse,
  handlePaging,
  mapGetNftsForOwnerResponse
} from '@echo/alchemy'

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
