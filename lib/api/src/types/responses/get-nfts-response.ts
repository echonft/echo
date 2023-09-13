import type { NftResponse } from '@echo/api/types/responses/model/nft-response'

export interface GetNftsResponse {
  nfts: Array<Partial<NftResponse>>
}
