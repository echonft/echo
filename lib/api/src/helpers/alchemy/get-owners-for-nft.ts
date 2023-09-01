import { fetcher } from '../fetcher'
import {
  AlchemyRoutes,
  getAlchemyRoute,
  GetOwnersForNftRequest,
  GetOwnersForNftResponse,
  handlePaging,
  mapGetOwnersForNftResponse
} from '@echo/alchemy'
import { Wallet } from '@echo/firestore'

function fetchOwnersForNft(request: GetOwnersForNftRequest) {
  return fetcher(getAlchemyRoute(AlchemyRoutes.GET_OWNERS_FOR_NFT))
    .query(request)
    .revalidate(3600)
    .fetch<GetOwnersForNftResponse>()
    .then(mapGetOwnersForNftResponse)
}

export function getOwnersForNft(contractAddress: string, tokenId: number) {
  return handlePaging<GetOwnersForNftRequest, Wallet>(fetchOwnersForNft, { contractAddress, tokenId })
}
