import type { RouteSearchParams } from '@echo/routing/types/route'

export interface FetchNftsByContractSearchParams extends RouteSearchParams {
  cursor?: string
  limit: number
  show_attribute: boolean
}
