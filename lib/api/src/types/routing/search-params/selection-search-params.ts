import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'

export interface SelectionSearchParams extends SearchParams {
  offer?: string // idContract
  listing?: string // slug
  swap?: string // idContract
}
