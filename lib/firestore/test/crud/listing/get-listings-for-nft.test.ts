import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { resetListing } from '@echo/firestore/utils/listing/reset-listing'
import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import { ListingState } from '@echo/model/constants/listing-state'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId, listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Slug } from '@echo/model/types/slug'
import { pastDate } from '@echo/utils/helpers/past-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - listing - getListingsForNft', () => {
  let slug: Nullable<Slug>
  function updateListingMockToStateOpen(listing: Listing): Listing {
    return pipe(assoc('state', ListingState.Open), assoc('readOnly', false))(listing)
  }
  beforeEach(async () => {
    slug = undefined
    const documents = await firestoreApp().collection(CollectionReferenceName.Listings).listDocuments()
    for (const document of documents) {
      await document.update({ state: ListingState.Open })
    }
  })
  afterEach(async () => {
    if (!isNil(slug)) {
      await resetListing(slug)
    }
  })

  it('returns an empty array if there are no listings with the given NFT', async () => {
    const nft = pipe(nftMockPxCrewId, getNftMockById)()
    const listings = await getListingsForNft(nft)
    expect(listings).toEqual([])
  })
  it('returns the listings with the given NFT as an item', async () => {
    const nft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    const listings = await getListingsForNft(nft)
    expect(listings.length).toBe(1)
    const mock = pipe(listingMockId, getListingMockById, updateListingMockToStateOpen)()
    expect(listings[0]).toStrictEqual(mock)
  })
  it('only returns the listings that are not read only', async () => {
    const nft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    slug = listingMockSlug()
    await updateListing(slug, { state: ListingState.Cancelled })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(slug, { state: ListingState.Fulfilled })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(slug, { state: ListingState.Expired })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(slug, { state: ListingState.PartiallyFulfilled })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(slug, { state: ListingState.OffersPending })
    const listings = await getListingsForNft(nft)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById(listingMockId()))
  })
  it('only returns the listings that are not expired', async () => {
    const nft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    slug = listingMockSlug()
    await updateListing(slug, { expiresAt: pastDate() })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
  })
})
