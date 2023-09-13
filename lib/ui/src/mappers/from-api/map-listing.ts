import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import { mapListingItem } from '@echo/ui/mappers/from-api/map-listing-item'
import { mapListingTarget } from '@echo/ui/mappers/from-api/map-listing-target'
import type { Listing } from '@echo/ui/types/model/listing'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
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
