import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

export interface FetchNftsByContractSearchParams extends SearchParams {
  cursor?: string
  limit: number
  show_attribute: boolean
}
