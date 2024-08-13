import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import type { NftTokenType } from '@echo/model/types/token-type'

export interface FetchNftsByAccountSearchParams extends SearchParams {
  erc_type: NftTokenType
  cursor?: string
  limit: number
  show_attribute: boolean
}
