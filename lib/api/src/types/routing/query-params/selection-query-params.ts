import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import type { Swap } from '@echo/model/types/swap'
import type { DeepPartial } from '@echo/utils/types/deep-partial'

export interface SelectionQueryParams extends QueryParams {
  offer?: DeepPartial<Offer> & Required<Pick<Offer, 'idContract'>>
  listing?: DeepPartial<Listing> & Required<Pick<Listing, 'slug'>>
  swap?: DeepPartial<Swap> & Required<Pick<Offer, 'idContract'>>
}
