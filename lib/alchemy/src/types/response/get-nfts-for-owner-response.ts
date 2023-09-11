import type { NftResponse } from '@echo-alchemy/types/response/nft-response'
import type { ResponseWithPaging } from '@echo-alchemy/types/response/response-with-paging'

export interface GetNftsForOwnerResponse extends ResponseWithPaging {
  ownedNfts: NftResponse[]
}
