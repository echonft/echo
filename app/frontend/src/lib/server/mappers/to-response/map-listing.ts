import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { mapListingItem } from '@server/mappers/to-response/map-listing-item'
import { mapListingTarget } from '@server/mappers/to-response/map-listing-target'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapListing(listing: Partial<FirestoreListing>): Partial<ListingResponse> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyDatePropToNumber<'expiresAt', Partial<FirestoreListing>>('expiresAt'),
    modifyDatePropToNumber<'createdAt', Partial<FirestoreListing>>('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('items', map(mapListingItem)),
    modify('targets', map(mapListingTarget)),
    dissoc('offersIds')
  )(listing)
}
