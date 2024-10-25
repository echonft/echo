import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { addListing } from '@echo/test/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/test/firestore/crud/listing/delete-listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, modify, pipe, take } from 'ramda'

describe('CRUD - listing - getListingById', () => {
  let createdListingId: Nullable<string>
  beforeEach(() => {
    createdListingId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdListingId)) {
      await deleteListing(createdListingId)
    }
  })

  it('returns undefined if the listing is not found', async () => {
    await expect(getListingBySignature('not-found')).resolves.toBeUndefined()
  })

  it('returns the listing with the given signature', async () => {
    const listing = pipe<[Listing], Listing, Listing>(
      modify<'target', Listing['target'], Listing['target']>('target', assoc('quantity', 20)),
      modify('items', take(1))
    )(listingMock)
    const signature = listingSignature(listing)
    createdListingId = await addListing(listing)
    const document = await getListingBySignature(signature)
    expect(document).toStrictEqual(listing)
  })
})
