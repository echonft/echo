import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Expiration } from '@echo/model/constants/expiration'
import { ListingState } from '@echo/model/constants/listing-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { type Listing } from '@echo/model/types/listing/listing'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { assoc, pipe, toLower, toString } from 'ramda'

export async function addListing(
  args: Pick<Listing, 'creator' | 'items' | 'target'> & Record<'expiration', Expiration>
): Promise<NewDocument<Listing>> {
  // TODO check for duplicates
  const expiresAt = expirationToDateNumber(args.expiration)
  const slug = pipe(nowMs, toString, toLower<string>)()
  const data = pipe(
    assoc('expiresAt', expiresAt),
    assoc('locked', false),
    assoc('slug', slug),
    assoc('state', ListingState.Open)
  )(args)
  const id = await setReference<Listing, ListingDocumentData>({
    collectionReference: getListingsCollectionReference(),
    data
  })
  return { id, data }
}
