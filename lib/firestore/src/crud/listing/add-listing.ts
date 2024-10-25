import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import type { Expiration } from '@echo/model/constants/expiration'
import { ListingState } from '@echo/model/constants/listing-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { type Listing } from '@echo/model/types/listing'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { assoc, dissoc, isNil, pipe } from 'ramda'

export async function addListing(
  args: Pick<Listing, 'creator' | 'items' | 'target'> & Record<'expiration', Expiration>
): Promise<NewDocument<Listing>> {
  const signature = listingSignature(args)
  const listing = await getListingBySignature(signature)
  if (!isNil(listing)) {
    return Promise.reject(Error(ListingError.Exists))
  }
  const expiresAt = expirationToDateNumber(args.expiration)
  const data = pipe(
    dissoc('expiration'),
    assoc('expiresAt', expiresAt),
    assoc('locked', false),
    assoc('slug', nowMsSlug()),
    assoc('state', ListingState.Open),
    assoc('signature', signature)
  )(args)
  const id = await setReference({
    collectionReference: getListingsCollectionReference(),
    data
  })
  return { id, data }
}
