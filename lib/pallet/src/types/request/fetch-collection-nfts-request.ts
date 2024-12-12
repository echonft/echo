import type { SeiAddress } from '@echo/model/types/sei-address'

export interface FetchCollectionNftsRequest {
  seiAddress: SeiAddress
  page: number
  pageSize?: number
}

export const DEFAULT_PAGE_SIZE = 100
