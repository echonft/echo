import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { assertListingOffers } from '@echo/firestore/utils/listing-offer/assert-listing-offers'
import { assertListings } from '@echo/firestore/utils/listing/assert-listings'
import { updateListing } from '@echo/firestore/utils/listing/update-listing'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { pastDate } from '@echo/utils/helpers/past-date'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, pipe } from 'ramda'

describe('CRUD - listing - getListingsForCreator', () => {
  let listingId: Nullable<string>
  beforeAll(async () => {
    await assertListings()
    await assertListingOffers()
  })
  afterAll(async () => {
    await assertListings()
    await assertListingOffers()
  })
  beforeEach(() => {
    listingId = undefined
  })
  afterEach(async () => {
    if (!isNil(listingId)) {
      await updateListing(listingId, getListingMockById(listingId))
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
    expect(listings[0]).toStrictEqual(getListingMockById(listingMockId()))
  })
  it('only returns the listings that are not read only', async () => {
    const nft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    listingId = listingMockId()
    await updateListing(listingId, { state: LISTING_STATE_CANCELLED })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(listingId, { state: LISTING_STATE_FULFILLED })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(listingId, { state: LISTING_STATE_EXPIRED })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(listingId, { state: LISTING_STATE_PARTIALLY_FULFILLED })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
    await updateListing(listingId, { state: LISTING_STATE_OFFERS_PENDING })
    const listings = await getListingsForNft(nft)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById(listingMockId()))
  })
  it('only returns the listings that are not expired', async () => {
    const nft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    listingId = listingMockId()
    await updateListing(listingId, { expiresAt: pastDate() })
    await expect(getListingsForNft(nft)).resolves.toEqual([])
  })
})
