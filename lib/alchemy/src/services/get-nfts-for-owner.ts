import { handleAlchemyPaging } from '@echo/alchemy/helpers/handle-alchemy-paging'
import { mapGetNftsForOwnerResponse } from '@echo/alchemy/mappers/map-get-nfts-for-owner-response'
import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import type { GetNftsForOwnerRequest } from '@echo/alchemy/types/request/get-nfts-for-owner-request'
import type { GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import type { Fetcher } from '@echo/utils/services/fetcher'
import { partialRight } from 'ramda'

function fetchNftsForOwner(request: GetNftsForOwnerRequest, chainId: number, fetcher: Fetcher) {
  return fetcher.query(request, true).fetchResponse<GetNftsForOwnerResponse>().then(mapGetNftsForOwnerResponse(chainId))
}

// TODO We will need to split the calls when we have more than 45 contract addresses as Alchemy
// does not allow more than 45 addresses at a same time.
export function getNftsForOwner(owner: string, contractAddresses: string[], chainId: number, fetcher: Fetcher) {
  return handleAlchemyPaging<GetNftsForOwnerRequest, AlchemyNft>(partialRight(fetchNftsForOwner, [chainId, fetcher]), {
    owner,
    contractAddresses
  })
}
