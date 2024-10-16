import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export interface SelectionSearchParams extends SearchParams {
  offer?: string // idContract
  listing?: string // slug
  swap?: string // idContract
}
