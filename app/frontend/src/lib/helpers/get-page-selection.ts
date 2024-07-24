import type { SelectionSearchParams } from '@echo/api/types/routing/search-params/selection-search-params'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import type { Swap } from '@echo/model/types/swap'
import type { PageSelection } from '@echo/ui/types/page-selection'
import type { Nullable } from '@echo/utils/types/nullable'
import { findIndex, isNil, propEq, toLower } from 'ramda'

interface GetPageSelectionArgs {
  listings: Listing[]
  offers: Offer[]
  swaps: Swap[]
  searchParams: SelectionSearchParams
}

export function getPageSelection(args: GetPageSelectionArgs): Nullable<PageSelection> {
  const { listings, offers, swaps, searchParams } = args
  if (!isNil(searchParams.listing)) {
    const index = findIndex(propEq(toLower(searchParams.listing), 'slug'), listings)
    if (index === -1) {
      return undefined
    }
    return {
      index,
      type: 'listing'
    }
  }
  if (!isNil(searchParams.offer)) {
    const index = findIndex(propEq(toLower(searchParams.offer), 'idContract'), offers)
    if (index === -1) {
      return undefined
    }
    return {
      index,
      type: 'offer'
    }
  }
  if (!isNil(searchParams.swap)) {
    const index = findIndex(propEq(toLower(searchParams.swap), 'idContract'), swaps)
    if (index === -1) {
      return undefined
    }
    return {
      index,
      type: 'swap'
    }
  }
  return undefined
}
