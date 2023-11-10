import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { handleAlchemyPaging } from '@echo/alchemy/helpers/handle-alchemy-paging'
import { mapGetNftsForOwnerResponse } from '@echo/alchemy/mappers/map-get-nfts-for-owner-response'
import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import type { GetNftsForOwnerRequest } from '@echo/alchemy/types/request/get-nfts-for-owner-request'
import type { GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import type { HexString } from '@echo/utils/types/hex-string'
import axios from 'axios'
import { stringify } from 'qs'
import { partialRight, pipe, prop } from 'ramda'

function fetchNftsForOwner(params: GetNftsForOwnerRequest, chainId: number) {
  return axios
    .get<GetNftsForOwnerResponse>(getAlchemyRoute(AlchemyRoutes.GET_NFTS_FOR_OWNER, chainId), {
      params,
      paramsSerializer: partialRight(stringify, [{ arrayFormat: 'brackets' }])
    })
    .then(pipe(prop('data'), mapGetNftsForOwnerResponse(chainId)))
}

// TODO We will need to split the calls when we have more than 45 contract addresses as Alchemy
// does not allow more than 45 addresses at a same time.
export function getNftsForOwner(owner: HexString, contractAddresses: HexString[], chainId: number) {
  return handleAlchemyPaging<GetNftsForOwnerRequest, AlchemyNft>(partialRight(fetchNftsForOwner, [chainId]), {
    owner,
    contractAddresses
  })
}
