import { type AlchemyNftResponse } from '@echo/alchemy/types/response/alchemy-nft-response'
import { type AlchemyResponseWithPaging } from '@echo/alchemy/types/response/alchemy-response-with-paging'

export interface GetNftsForOwnerResponse extends AlchemyResponseWithPaging {
  ownedNfts: AlchemyNftResponse[]
}
