import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { getListingsForCreator } from '../../../src/crud/listing/get-listings-for-creator'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Listing } from '@echo/firestore-types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getListingsForCreator', () => {
  const id = 'jUzMtPGKM62mMhEcmbN4'
  let initialExpiresAt: dayjs.Dayjs

  async function setExpired(listing: Listing) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0)
    await updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(listing)
  }

  async function setNotExpired(listing: Listing) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0)
    await updateListing(listing.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(listing)
  }

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialExpiresAt = listing!.expiresAt
  })
  afterEach(async () => {
    await updateListing(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForCreator('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings for the creator', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    const listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn', { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn', { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getListingMockById(id))
    let listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn', { notStates: ['INVALID', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn', { notStates: ['OPEN', 'FULFILLED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpirer filter', async () => {
    const mock = await setExpired(getListingMockById(id))
    let listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn', { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn', { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn')
    expect(listings.length).toBe(0)
  })
})
