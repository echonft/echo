import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionListingsCount } from '@echo/firestore/crud/collection/get-collection-listings-count'
import { collectionDocumentMockPx } from '@echo/firestore/mocks/collection-document-mock'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { addCollection } from '@echo/test/firestore/crud/collection/add-collection'
import { addListing } from '@echo/test/firestore/crud/listing/add-listing'
import { deleteListing } from '@echo/test/firestore/crud/listing/delete-listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection - getCollectionListingsCount', () => {
  let collectionId: Nullable<string>
  let listingId: Nullable<string>

  beforeEach(() => {
    collectionId = undefined
    listingId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionId)) {
      await deleteCollection(collectionId)
    }
    if (!isNil(listingId)) {
      await deleteListing(listingId)
    }
  })

  it('returns 0 if there are no listings for the collection', async () => {
    await expect(getCollectionListingsCount('not-found')).resolves.toEqual(0)
  })

  it('returns the listings count for the collection', async () => {
    collectionId = await addCollection(collectionDocumentMockPx)
    listingId = await addListing(listingDocumentMock)
    const count = await getCollectionListingsCount(collectionDocumentMockPx.slug)
    expect(count).toEqual(1)
  })
})
