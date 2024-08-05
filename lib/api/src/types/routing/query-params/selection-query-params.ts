import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { Offer } from '@echo/model/types/offer'
import type { WithSlug } from '@echo/model/types/with-slug'

export interface SelectionQueryParams extends QueryParams {
  offer?: Pick<Offer, 'idContract'>
  listing?: WithSlug
  swap?: Pick<Offer, 'idContract'>
}
