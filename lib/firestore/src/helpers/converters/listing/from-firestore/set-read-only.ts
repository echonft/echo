import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import { isIn } from '@echo/utils/fp/is-in'
import { always, assoc, converge, identity, pipe, prop } from 'ramda'

export function setReadOnly(listing: ListingDocumentData): Listing {
  return converge<
    Listing,
    [
      (model: ListingDocumentData) => string,
      (model: ListingDocumentData) => boolean,
      (model: ListingDocumentData) => ListingDocumentData
    ]
  >(assoc, [always('readOnly'), pipe(prop('state'), isIn<ListingState>(READ_ONLY_LISTING_STATES)), identity])(listing)
}
