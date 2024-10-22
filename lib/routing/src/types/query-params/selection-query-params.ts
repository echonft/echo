import type { WithSlug } from '@echo/model/types/with-slug'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'

export interface SelectionQueryParams extends QueryParams {
  offer?: WithSlug
  listing?: WithSlug
  swap?: WithSlug
}
