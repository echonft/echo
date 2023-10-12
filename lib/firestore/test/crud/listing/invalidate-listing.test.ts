import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { invalidateListing } from '@echo/firestore/crud/listing/invalidate-listing'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/listing/assert-listings'
import { uncheckedUpdateListing } from '@test-utils/listing/unchecked-update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - listing - invalidateListing', () => {
  let initialState: FirestoreListingState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const listingId = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const listing = (await findListingById(listingId))!
    initialState = listing.state
    initialExpiresAt = listing.expiresAt
    initialUpdatedAt = listing.updatedAt
  })
  afterEach(async () => {
    await uncheckedUpdateListing(listingId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
  })

  it('throws if the listing is undefined', async () => {
    await expect(invalidateListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await uncheckedUpdateListing(listingId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(invalidateListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await uncheckedUpdateListing(listingId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await uncheckedUpdateListing(listingId, { state: 'FULFILLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is invalid', async () => {
    await uncheckedUpdateListing(listingId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateListing(listingId)).rejects.toBeDefined()
  })

  it('invalidate listing if its not expired', async () => {
    await uncheckedUpdateListing(listingId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await invalidateListing(listingId)
    const updatedListing = (await findListingById(listingId))!
    expect(updatedListing.state).toEqual('INVALID')
    expectDateNumberIsNow(updatedListing.updatedAt)
  })
})
