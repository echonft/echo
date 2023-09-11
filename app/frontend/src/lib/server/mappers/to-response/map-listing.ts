import type { ListingResponse } from '@echo/api'
import type { Listing } from '@echo/firestore-types'
import { modifyDatePropToNumber } from '@echo/utils'
import { mapListingItem } from '@server/mappers/to-response/map-listing-item'
import { mapListingTarget } from '@server/mappers/to-response/map-listing-target'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapListing(listing: Partial<Listing>): Partial<ListingResponse> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyDatePropToNumber<'expiresAt', Partial<Listing>>('expiresAt'),
    modifyDatePropToNumber<'createdAt', Partial<Listing>>('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('items', map(mapListingItem)),
    modify('targets', map(mapListingTarget)),
    dissoc('offersIds')
  )(listing)
}
