import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import type { ErcType } from '@echo/nft-scan/types/erc-type'

export interface FetchNftsByAccountSearchParams extends SearchParams {
  erc_type: ErcType
  cursor?: string
  limit: number
  show_attribute: boolean
}
