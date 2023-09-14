import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { handleAlchemyPaging } from '@echo/alchemy/helpers/handle-alchemy-paging'
import { mapGetOwnersForNftResponse } from '@echo/alchemy/mappers/map-get-owners-for-nft-response'
import type { GetOwnersForNftRequest } from '@echo/alchemy/types/request/get-owners-for-nft-request'
import type { GetOwnersForNftResponse } from '@echo/alchemy/types/response/get-owners-for-nft-response'
import { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { fetcher } from '@helpers/fetcher'

function fetchOwnersForNft(request: GetOwnersForNftRequest) {
  return fetcher(getAlchemyRoute(AlchemyRoutes.GET_OWNERS_FOR_NFT))
    .query(request)
    .revalidate(3600)
    .fetchResponse<GetOwnersForNftResponse>()
    .then(mapGetOwnersForNftResponse)
}

export function getOwnersForNft(contractAddress: string, tokenId: number) {
  return handleAlchemyPaging<GetOwnersForNftRequest, FirestoreWallet>(fetchOwnersForNft, { contractAddress, tokenId })
}
