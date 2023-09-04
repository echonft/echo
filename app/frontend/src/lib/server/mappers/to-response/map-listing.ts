import { mapListingItem } from './map-listing-item'
import { mapListingTarget } from './map-listing-target'
import { mapUserDetails } from './map-user-details'
import { ListingResponse } from '@echo/api'
import { Listing } from '@echo/firestore-types'
import { modifyDatePropToNumber, removeUndefinedProps } from '@echo/utils'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapListing(listing: Listing): ListingResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    removeUndefinedProps,
    dissoc('createdAt'),
    dissoc('offersIds'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('creator', mapUserDetails),
    modifyDatePropToNumber('expiresAt'),
    modify('items', map(mapListingItem)),
    modify('targets', map(mapListingTarget))
  )(listing) as Listing
}
