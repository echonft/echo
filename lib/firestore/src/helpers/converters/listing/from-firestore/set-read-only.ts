import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import { isIn } from '@echo/utils/fp/is-in'
import { always, assoc, converge, identity, pipe, prop } from 'ramda'

type Args = Partial<ListingDocumentData> & Pick<ListingDocumentData, 'state'>

export function setReadOnly(listing: Args): Listing {
  return converge<Listing, [(model: Args) => string, (model: Args) => boolean, (model: Args) => Args]>(assoc, [
    always('readOnly'),
    pipe(prop('state'), isIn<ListingState>(READ_ONLY_LISTING_STATES)),
    identity
  ])(listing)
}
