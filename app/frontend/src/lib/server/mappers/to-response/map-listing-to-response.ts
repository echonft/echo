import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { mapListingItemToResponse } from '@server/mappers/to-response/map-listing-item-to-response'
import { mapListingTargetToResponse } from '@server/mappers/to-response/map-listing-target-to-response'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapListingToResponse(listing: FirestoreListing): ListingResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyDatePropToNumber<'expiresAt', FirestoreListing>('expiresAt'),
    modifyDatePropToNumber<'createdAt', FirestoreListing>('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('items', map(mapListingItemToResponse)),
    modify('targets', map(mapListingTargetToResponse)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dissoc('offersIds'),
    modifyDatePropToNumber<'updatedAt', FirestoreListing>('updatedAt')
  )(listing)
}
