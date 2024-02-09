import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OPEN
} from '@echo/model/constants/listing-states'
import { type ListingState } from '@echo/model/types/listing-state'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('CRUD - listing - cancelListing', () => {
  let initialState: ListingState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const listingId = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(async () => {
    await assertListings()
  })
  afterAll(async () => {
    await assertListings()
  })
  beforeEach(async () => {
    const listing = (await findListingById(listingId))!
    initialState = listing.state
    initialExpiresAt = listing.expiresAt
    initialUpdatedAt = listing.updatedAt
  })
  afterEach(async () => {
    await unchecked_updateListing(listingId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
  })

  it('throws if the listing is undefined', async () => {
    await expect(cancelListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_OPEN,
      expiresAt: dayjs().subtract(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_CANCELLED,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_FULFILLED,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('cancel listing if its not expired and in the right state', async () => {
    await unchecked_updateListing(listingId, { state: LISTING_STATE_OPEN, expiresAt: dayjs().add(1, 'day').unix() })
    await cancelListing(listingId)
    const updatedListing = (await findListingById(listingId))!
    expect(updatedListing.state).toEqual(LISTING_STATE_CANCELLED)
    expectDateNumberIsNow(updatedListing.updatedAt)
  })
})
