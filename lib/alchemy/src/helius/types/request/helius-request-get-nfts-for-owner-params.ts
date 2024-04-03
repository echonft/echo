import type { HeliusRequestPagingParams } from '@echo/alchemy/helius/types/request/helius-request-paging-params'

export interface HeliusRequestGetNftsForOwnerParams extends HeliusRequestPagingParams {
  ownerAddress: string
}
