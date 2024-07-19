import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

export interface FetchNftsByAccountSearchParams extends SearchParams {
  next?: string
  limit: number
}
