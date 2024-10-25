import type { Slug } from '@echo/model/types/slug'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'

export interface SelectionQueryParams extends QueryParams {
  offer?: Record<'slug', Slug>
  listing?: Record<'slug', Slug>
  swap?: Record<'slug', Slug>
}
