import { listingSchema } from '@echo/model/validators/listing-schema'
import { offerSchema } from '@echo/model/validators/offer-schema'
import { swapSchema } from '@echo/model/validators/swap-schema'
import { FrontendSelectionType } from '@echo/routing/constants/frontend-selection-type'
import { selectionSearchParamsSchema } from '@echo/routing/validators/frontend/selection/selection-search-params-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { findIndex, has, isNil, propEq } from 'ramda'
import { object } from 'zod'

export const selectionSearchParamsDataSchema = object({
  listings: listingSchema.array(),
  offers: offerSchema.array(),
  swaps: swapSchema.array(),
  searchParams: selectionSearchParamsSchema.optional()
}).transform<Nullable<Record<'index', number> & Record<'type', FrontendSelectionType>>>(
  ({ listings, offers, swaps, searchParams }) => {
    if (isNil(searchParams)) {
      return undefined
    }
    if (has('listing', searchParams)) {
      const index = findIndex(propEq(searchParams.listing, 'slug'), listings)
      if (index === -1) {
        return undefined
      }
      return {
        index,
        type: FrontendSelectionType.Listing
      }
    }
    if (has('offer', searchParams)) {
      const index = findIndex(propEq(searchParams.offer, 'slug'), offers)
      if (index === -1) {
        return undefined
      }
      return {
        index,
        type: FrontendSelectionType.Offer
      }
    }
    const index = findIndex(propEq(searchParams.swap, 'slug'), swaps)
    if (index === -1) {
      return undefined
    }
    return {
      index,
      type: FrontendSelectionType.Swap
    }
  }
)
