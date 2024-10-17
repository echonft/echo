import type { Slug } from '@echo/model/types/slug'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export interface SelectionSearchParams extends SearchParams {
  offer?: string // idContract
  listing?: Slug // slug
  swap?: string // idContract
}
