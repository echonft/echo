import type { PagingResponse } from '@echo/opensea/types/paging/paging-response'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'

export type GetNftsByAccountResponse = PagingResponse<NftResponse, 'nfts'>
