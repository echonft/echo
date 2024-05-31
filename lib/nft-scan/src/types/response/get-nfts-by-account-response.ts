import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import type { PagedResponse } from '@echo/nft-scan/types/response/paged-response'

export type GetNftsByAccountResponse = PagedResponse<NftResponse>
