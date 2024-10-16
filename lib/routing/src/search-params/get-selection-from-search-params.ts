import type { Listing } from '@echo/model/types/listing/listing'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Swap } from '@echo/model/types/offer/swap'
import type { SelectionSearchParams } from '@echo/routing/types/search-params/selection-search-params'
import type { Nullable } from '@echo/utils/types/nullable'
import { findIndex, isNil, propEq, toLower } from 'ramda'
import type { Selection } from '../types/selection'

interface GetPageSelectionArgs {
  listings: Listing[]
  offers: Offer[]
  swaps: Swap[]
  searchParams: SelectionSearchParams
}

export function getSelectionFromSearchParams(args: GetPageSelectionArgs): Nullable<Selection> {
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
