import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsForNft', () => {
  const id = 'jUzMtPGKM62mMhEcmbN4'
  const nftId = '8hHFadIrrooORfTOLkBg'
  const mock = getListingMockById(id)

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForNft('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings for the nft', async () => {
    const listings = await getListingsForNft(nftId)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    let listings = await getListingsForNft(nftId, { state: [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_CANCELLED] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForNft(nftId, { state: [LISTING_STATE_CANCELLED] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    let listings = await getListingsForNft(nftId, {
      notState: [LISTING_STATE_PARTIALLY_FULFILLED, LISTING_STATE_CANCELLED]
    })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForNft(nftId, { notState: [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_FULFILLED] })
    expect(listings.length).toBe(0)
  })
})
