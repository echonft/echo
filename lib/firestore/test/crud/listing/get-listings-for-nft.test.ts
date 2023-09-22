import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { updateListing } from '@echo/firestore/crud/listing/update-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForNft', () => {
  const id = 'jUzMtPGKM62mMhEcmbN4'
  const nftId = '8hHFadIrrooORfTOLkBg'
  let initialExpiresAt: dayjs.Dayjs

  async function setExpired(listing: FirestoreListing) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0)
    await updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(listing)
  }

  async function setNotExpired(listing: FirestoreListing) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0)
    await updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(listing)
  }

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialExpiresAt = listing!.expiresAt
  })
  afterEach(async () => {
    await updateListing(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForNft('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings for the nft', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    const listings = await getListingsForNft(nftId)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForNft(nftId, { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForNft(nftId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForNft(nftId, { notStates: ['INVALID', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForNft(nftId, { notStates: ['OPEN', 'FULFILLED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getListingMockById(id))
    let listings = await getListingsForNft(nftId, { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForNft(nftId, { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getListingsForNft(nftId)
    expect(listings.length).toBe(0)
  })
})
