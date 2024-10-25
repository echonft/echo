import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { nftMockPx3, nftMockSpiral1, nftMockSpiral2 } from '@echo/model/mocks/nft-mock'
import type { Slug } from '@echo/model/types/slug'
import { resetListing } from '@echo/test/firestore/crud/listing/reset-listing'
import { updateListing } from '@echo/test/firestore/crud/listing/update-listing'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - listing - getListingsForNft', () => {
  let slug: Nullable<Slug>
  function updateListingMockToStateOpen(listing: ListingDocument): ListingDocument {
    return pipe(assoc('state', ListingState.Open), assoc('locked', false))(listing)
  }
  beforeEach(async () => {
    slug = undefined
    const documents = await firestoreApp().collection(CollectionPath.Listings).listDocuments()
    for (const document of documents) {
      await document.update({ state: ListingState.Open })
    }
  })
  afterEach(async () => {
    if (!isNil(slug)) {
      await resetListing()
    }
  })

  it('returns an empty array if there are no listings with the given NFT', async () => {
    const listings = await getListingsForNft(nftMockPx3)
    expect(listings).toEqual([])
  })
  it('returns the listings with the given NFT as an item', async () => {
    const listings = await getListingsForNft(nftMockSpiral1)
    expect(listings.length).toBe(1)
    const mock = updateListingMockToStateOpen(listingDocumentMock)
    expect(listings[0]).toStrictEqual(mock)
  })
  it('only returns the listings that are not locked', async () => {
    slug = listingMock.slug
    await updateListing(slug, { locked: true })
    await expect(getListingsForNft(nftMockSpiral2)).resolves.toEqual([])
  })
})
