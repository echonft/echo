import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import { mapListingItemFromResponse } from '@echo/ui/mappers/from-api/map-listing-item-from-response'
import { mapListingTargetFromResponse } from '@echo/ui/mappers/from-api/map-listing-target-from-response'
import type { Listing } from '@echo/ui/types/model/listing'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import { map, modify, pipe } from 'ramda'

export function mapListingFromResponse(response: ListingResponse) {
  return pipe(
    modifyNumberPropToDate<'createdAt', ListingResponse>('createdAt'),
    modifyNumberPropToDate('expiresAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('items', map(mapListingItemFromResponse)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('targets', map(mapListingTargetFromResponse)),
    modifyNumberPropToDate<'updatedAt', ListingResponse>('updatedAt')
  )(response) as Listing
}
