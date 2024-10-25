import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { listingDocumentMockId } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingById', () => {
  it('returns undefined if the listing is not found', async () => {
    await expect(getListingById('not-found')).resolves.toBeUndefined()
  })
  it('returns the listing with the given id', async () => {
    const listing = await getListingById(listingDocumentMockId)
    expect(listing).toStrictEqual(listingDocumentMock)
  })
})
