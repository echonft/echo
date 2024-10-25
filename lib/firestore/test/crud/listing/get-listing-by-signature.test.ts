import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { addListing } from '@echo/test/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/test/firestore/crud/listing/delete-listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, modify, omit, pipe, take } from 'ramda'

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
    const listingDocument = pipe<[ListingDocument], ListingDocument, ListingDocument>(
      modify<'target', ListingDocument['target'], ListingDocument['target']>('target', assoc('quantity', 20)),
      modify<'items', ListingDocument['items'], ListingDocument['items']>('items', take(1))
    )(listingDocumentMock)
    const signature = listingSignature(listingDocument)
    createdListingId = await addListing(listingDocument)
    const document = await getListingBySignature(signature)
    expect(omit(['signature'], document!)).toStrictEqual(omit(['signature'], listingDocument))
  })
})
