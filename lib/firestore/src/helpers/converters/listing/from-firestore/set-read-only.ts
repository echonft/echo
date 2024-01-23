import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { LISTING_STATE_EXPIRED, READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import { isIn } from '@echo/utils/fp/is-in'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { always, assoc, converge, identity, pipe, prop, when } from 'ramda'

export function setReadOnly(listing: ListingDocumentData): Listing {
  return pipe(
    when<ListingDocumentData, ListingDocumentData>(
      pipe(prop('expiresAt'), dateNumberIsPast),
      assoc('state', LISTING_STATE_EXPIRED)
    ),
    converge<
      Listing,
      [
        (model: ListingDocumentData) => string,
        (model: ListingDocumentData) => boolean,
        (model: ListingDocumentData) => ListingDocumentData
      ]
    >(assoc, [always('readOnly'), pipe(prop('state'), isIn<ListingState>(READ_ONLY_LISTING_STATES)), identity])
  )(listing)
}
