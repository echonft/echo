import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED
} from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { always, anyPass, assoc, converge, equals, identity, pipe, prop, when } from 'ramda'

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
    >(assoc, [
      always('readOnly'),
      pipe(
        prop('state'),
        anyPass([equals(LISTING_STATE_EXPIRED), equals(LISTING_STATE_FULFILLED), equals(LISTING_STATE_CANCELLED)])
      ),
      identity
    ])
  )(listing)
}
