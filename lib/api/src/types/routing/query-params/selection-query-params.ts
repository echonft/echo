import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import type { Swap } from '@echo/model/types/swap'
import type { Nullable } from '@echo/utils/types/nullable'

export interface SelectionQueryParams extends Record<string, unknown> {
  offer?: Nullable<Offer>
  listing?: Nullable<Listing>
  swap?: Nullable<Swap>
}
