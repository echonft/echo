import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import type { Swap } from '@echo/model/types/swap'
import type { SelectionQueryParams } from '@echo/routing/types/query-params/selection-query-params'
import type { SelectionSearchParams } from '@echo/routing/types/search-params/selection-search-params'
import { modify, pipe, prop } from 'ramda'

export function selectionQueryMapper(params: SelectionQueryParams): SelectionSearchParams {
  return pipe(
    modify<'offer', Offer, string>('offer', prop('slug')) as (
      obj: SelectionQueryParams
    ) => Omit<SelectionQueryParams, 'offer'> & Pick<SelectionSearchParams, 'offer'>,
    modify<'listing', Listing, string>('listing', prop('slug')) as (
      obj: Omit<SelectionQueryParams, 'offer'> & Pick<SelectionSearchParams, 'offer'>
    ) => Omit<SelectionQueryParams, 'offer' | 'listing'> & Pick<SelectionSearchParams, 'offer' | 'listing'>,
    modify<'swap', Swap, string>('swap', prop('slug')) as (
      obj: Omit<SelectionQueryParams, 'offer' | 'listing'> & Pick<SelectionSearchParams, 'offer' | 'listing'>
    ) => SelectionSearchParams
  )(params)
}
