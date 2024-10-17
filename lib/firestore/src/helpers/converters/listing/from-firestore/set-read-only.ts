import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { ListingState, readOnlyListingStates } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { isIn } from '@echo/utils/fp/is-in'
import { always, assoc, converge, identity, pipe, prop } from 'ramda'

type Args = Partial<ListingDocumentData> & Pick<ListingDocumentData, 'state'>

export function setReadOnly(listing: Args): Listing {
  return converge<Listing, [(model: Args) => string, (model: Args) => boolean, (model: Args) => Args]>(assoc, [
    always('readOnly'),
    pipe(prop('state'), isIn<ListingState>(readOnlyListingStates)),
    identity
  ])(listing)
}
