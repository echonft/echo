import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { assoc } from 'ramda'

export function addListing(args: ListingDocument): Promise<string> {
  const signature = listingSignature(args)
  const data = assoc('signature', signature, args)
  return setReference({
    collectionReference: listingsCollection(),
    data
  })
}
