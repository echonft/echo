import type { NftResponse } from '@echo/opensea/types/response/nft-response'

export interface GetNftsByAccountResponse {
  nfts: NftResponse[]
  next?: string
}
