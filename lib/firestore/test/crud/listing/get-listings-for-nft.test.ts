import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { resetListings } from '@echo/firestore/utils/listing/reset-listings'
import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import { ListingState } from '@echo/model/constants/listing-state'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId, listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Listing } from '@echo/model/types/listing/listing'
import { pastDate } from '@echo/utils/helpers/past-date'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForNft', () => {
  function updateListingMockToStateOpen(listing: Listing): Listing {
    return pipe(assoc('state', ListingState.Open), assoc('readOnly', false))(listing)
  }
  beforeEach(async () => {
    await resetListings()
    const documents = await firestoreApp().collection(CollectionReferenceName.Listings).listDocuments()
    for (const document of documents) {
      await document.update({ state: ListingState.Open })
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
    const slug = listingMockSlug()
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
    await updateListing(listingMockSlug(), { expiresAt: pastDate() })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
  })
})
