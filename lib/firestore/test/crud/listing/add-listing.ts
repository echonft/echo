import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { type Listing } from '@echo/model/types/listing'
import { assoc } from 'ramda'

export function addListing(args: Listing): Promise<string> {
  const signature = listingSignature(args)
  const data = assoc('signature', signature, args)
  return setReference({
    collectionReference: getListingsCollectionReference(),
    data
  })
}
