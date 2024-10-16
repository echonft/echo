import type { NftTokenType } from '@echo/model/constants/token-type'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export interface FetchNftsByAccountSearchParams extends SearchParams {
  erc_type: NftTokenType
  cursor?: string
  limit: number
  show_attribute: boolean
}
