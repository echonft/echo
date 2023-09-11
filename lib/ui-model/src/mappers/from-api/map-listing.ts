import { Listing } from '../../types/listing'
import { mapListingItem } from './map-listing-item'
import { mapListingTarget } from './map-listing-target'
import type { ListingResponse } from '@echo/api/types'
import { modifyNumberPropToDate } from '@echo/utils'
import { map, modify, pipe } from 'ramda'

export function mapListing(response: Partial<ListingResponse>) {
  return pipe(
    modifyNumberPropToDate<'createdAt', Partial<ListingResponse>>('createdAt'),
    modifyNumberPropToDate('expiresAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('items', map(mapListingItem)),
    modify('targets', map(mapListingTarget))
  )(response) as Listing
}
