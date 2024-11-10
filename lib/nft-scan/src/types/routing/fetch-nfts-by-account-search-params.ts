import type { NftTokenType } from '@echo/model/constants/token-type'
import type { RouteSearchParams } from '@echo/routing/types/route'

export interface FetchNftsByAccountSearchParams extends RouteSearchParams {
  erc_type: NftTokenType
  cursor?: string
  limit: number
  show_attribute: boolean
}
